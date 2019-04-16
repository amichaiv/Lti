using System;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using LtiLibrary.NetCore.Common;
using LtiLibrary.NetCore.Lti.v1;
using LtiProvider.Models;
using LtiProvider.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
using System.IO;
using System.Web;
using System.Xml.Serialization;
using LtiProvider.Extensions;
using LtiProvider.OAuth;
using OAuthConstants = LtiLibrary.NetCore.OAuth.OAuthConstants;

namespace LtiProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : Controller
    {
        private const string SharedSecret = "secret";

        private static readonly XmlSerializer ImsxRequestSerializer;
        private static readonly XmlSerializer ImsxResponseSerializer;

        private readonly IRequestData _requestData;

        /// These OAuth parameters are required in OAuth Authorization Headers
        protected static readonly string[] RequiredOauthAuthorizationHeaderParameters =
        {
            OAuthConstants.BodyHashParameter,
            OAuthConstants.ConsumerKeyParameter,
            OAuthConstants.NonceParameter,
            OAuthConstants.SignatureParameter,
            OAuthConstants.SignatureMethodParameter,
            OAuthConstants.TimestampParameter,
            OAuthConstants.VersionParameter,
            OAuthConstants.RealmParameter,
        };

        static ConnectionController()
        {
            // Create two serializers: one for requests and one for responses.
            ImsxRequestSerializer = new XmlSerializer(typeof(imsx_POXEnvelopeType));
            ImsxResponseSerializer = new XmlSerializer(typeof(imsx_POXEnvelopeType), null, null, new XmlRootAttribute("imsx_POXEnvelopeResponse"),
                "http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0");
        }

        public ConnectionController(IRequestData requestData)
        {
            _requestData = requestData;
        }

        [HttpPost]
        public IActionResult Connect()
        {
            _requestData.Clear();
            SaveRequestData(Request);
            return View("ConnectView");
        }
       
        public IActionResult PostOutcome()
        {
            var data = _requestData.Get();
            var imsxEnvelope = new imsx_POXEnvelopeType
            {
                imsx_POXHeader = new imsx_POXHeaderType {Item = new imsx_RequestHeaderInfoType()},
                imsx_POXBody = new imsx_POXBodyType {Item = new replaceResultRequest()}
            };

            var imsxHeader = (imsx_RequestHeaderInfoType) imsxEnvelope.imsx_POXHeader.Item;
            imsxHeader.imsx_version = imsx_GWSVersionValueType.V10;
            imsxHeader.imsx_messageIdentifier = Guid.NewGuid().ToString();

            var imsxBody = (replaceResultRequest) imsxEnvelope.imsx_POXBody.Item;
            imsxBody.resultRecord = new ResultRecordType
            {
                sourcedGUID = new SourcedGUIDType {sourcedId = data.ResultSourcedId},
                result = new ResultType
                {
                    resultScore = new TextType {language = LtiConstants.ScoreLanguage, textString = "0.54"}
                }
            };
            // The LTI 1.1 specification states in 6.1.1. that the score in replaceResult should
            // always be formatted using “en” formatting
            // (http://www.imsglobal.org/LTI/v1p1p1/ltiIMGv1p1p1.html#_Toc330273034).

            try
            {
                var webRequest = CreateLtiOutcomesRequest(
                    imsxEnvelope,
                    data.OutcomeServiceUrl,
                    data.OAuthConsumerKey);
                var webResponse = webRequest.GetResponse() as HttpWebResponse;
                if (ParsePostResultResponse(webResponse)) return View("SuccessView");
            }
            catch (Exception)
            {
            }
            return View("ConnectView");
        }

        public IActionResult GetCourseEnrolled()
        {

        }

        private void SaveRequestData(HttpRequest request)
        {
            var form = request.Form;
            form.TryGetValue("lis_outcome_service_url", out var outcomeServiceUrl);
            form.TryGetValue("lis_result_sourcedid", out var lisResultSourceDid);
            form.TryGetValue("oauth_consumer_key", out var oauthConsumerKey);
            form.TryGetValue("oauth_nonce", out var oauthNonce);
            form.TryGetValue("oauth_signature_method", out var oauthSignatureMethod);
            form.TryGetValue("oauth_timestamp", out var oauthTimestamp);
            long.TryParse(oauthTimestamp, out var timestamp);
            form.TryGetValue("oauth_version", out var oauthVersion);
            var ltiRequestData = new LtiRequestData
            {
                OutcomeServiceUrl = outcomeServiceUrl,
                ResultSourcedId = lisResultSourceDid,
                OAuthConsumerKey = oauthConsumerKey,
                OAuthNonce = oauthNonce,
                OAuthSignatureMethod = oauthSignatureMethod,
                OAuthTimestamp = timestamp,
                OAuthVersion = oauthVersion
            };
            _requestData.Add(ltiRequestData);
        }

        private static HttpWebRequest CreateLtiOutcomesRequest(imsx_POXEnvelopeType imsxEnvelope, string url, string consumerKey)
        {
            var webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/xml";

            var parameters = new NameValueCollection();
            parameters.AddParameter(OAuthConstants.ConsumerKeyParameter, consumerKey);
            parameters.AddParameter(OAuthConstants.NonceParameter, Guid.NewGuid().ToString());
            parameters.AddParameter(OAuthConstants.SignatureMethodParameter, OAuthConstants.SignatureMethodHmacSha1);
            parameters.AddParameter(OAuthConstants.VersionParameter, OAuthConstants.Version10);

            // Calculate the timestamp
            var ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            var timestamp = Convert.ToInt64(ts.TotalSeconds);
            parameters.AddParameter(OAuthConstants.TimestampParameter, timestamp);

            // Calculate the body hash
            using (var ms = new MemoryStream())
            using (var sha1 = new SHA1CryptoServiceProvider())
            {
                ImsxRequestSerializer.Serialize(ms, imsxEnvelope);
                ms.Position = 0;
                ms.CopyTo(webRequest.GetRequestStream());

                var hash = sha1.ComputeHash(ms.ToArray());
                var hash64 = Convert.ToBase64String(hash);
                parameters.AddParameter(OAuthConstants.BodyHashParameter, hash64);
            }

            // Calculate the signature
            var signature = OAuthUtility.GenerateSignature(webRequest.Method, webRequest.RequestUri, parameters,
                SharedSecret);
            parameters.AddParameter(OAuthConstants.SignatureParameter, signature);

            // Build the Authorization header
            var authorization = new StringBuilder(OAuthConstants.AuthScheme).Append(" ");
            foreach (var key in parameters.AllKeys)
            {
                authorization.AppendFormat("{0}=\"{1}\",", key, HttpUtility.UrlEncode(parameters[key]));
            }
            webRequest.Headers["Authorization"] = authorization.ToString(0, authorization.Length - 1);

            return webRequest;
        }

        private static bool ParsePostResultResponse(HttpWebResponse webResponse)
        {
            var stream = webResponse?.GetResponseStream();
            if (stream == null) return false;

            var imsxEnvelope = ImsxResponseSerializer.Deserialize(stream) as imsx_POXEnvelopeType;

            var imsxHeader = imsxEnvelope?.imsx_POXHeader.Item as imsx_ResponseHeaderInfoType;
            if (imsxHeader == null) return false;

            var imsxStatus = imsxHeader.imsx_statusInfo.imsx_codeMajor;
            var imsxDescription = imsxHeader.imsx_statusInfo.imsx_description;

            return imsxStatus == imsx_CodeMajorType.success;
        }
    }
}