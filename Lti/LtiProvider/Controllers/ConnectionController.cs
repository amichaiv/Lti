using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using LtiLibrary.AspNetCore.Extensions;
using LtiLibrary.NetCore.OAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LtiProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {
        private const string SharedSecret = "secret";
        private static readonly HttpClient Client = new HttpClient();

        /// These OAuth parameters are required in OAuth Authorization Headers
        protected static readonly string[] RequiredOauthAuthorizationHeaderParameters =
        {
            OAuthConstants.RealmParameter,
            OAuthConstants.VersionParameter,
            OAuthConstants.NonceParameter,
            OAuthConstants.TimestampParameter,
            OAuthConstants.ConsumerKeyParameter,
            OAuthConstants.BodyHashParameter,
            OAuthConstants.SignatureMethodParameter,
            OAuthConstants.SignatureParameter,
        };

        [HttpPost]
        public async Task<IActionResult> Connect()
        {
            // Parse and validate the request
            var ltiRequest = await Request.ParseLtiRequestAsync();
            Request.Form.TryGetValue("lis_outcome_service_url", out var outcomeServiceUrl);
            Request.Form.TryGetValue("lis_result_sourcedid", out var lisResultSourceDid); // Todo: ADD to XML manually

            var authorizationHeaderValue = GenerateAuthorizationString(Request.Form, outcomeServiceUrl);
            await PostRequest(outcomeServiceUrl, authorizationHeaderValue);

            var requestInfo = $"Hello {ltiRequest.LisPersonNameFull}{Environment.NewLine}"
                              + $"Welcome to CodeValue Lti Tool{Environment.NewLine}"
                              + $"Moodle Name: {ltiRequest.ToolConsumerInstanceName}{Environment.NewLine}"
                              + $"Course Name: {ltiRequest.ContextLabel}{Environment.NewLine}"
                              + $"Tool Title: {ltiRequest.ResourceLinkTitle}{Environment.NewLine}";

            return Ok(requestInfo);
        }


        private static AuthenticationHeaderValue GenerateAuthorizationString(IFormCollection form, string outcomeServiceUrl)
        {
            var authRequest = new OAuthRequest
            {
                HttpMethod = "POST",
                Url = new Uri(outcomeServiceUrl)
            };
            form.TryGetValue("oauth_consumer_key", out var oauthConsumerKey);
            form.TryGetValue("oauth_nonce", out var oauthNonce);
            form.TryGetValue("oauth_signature_method", out var oauthSignatureMethod);
            form.TryGetValue("oauth_timestamp", out var oauthTimestamp);
            long.TryParse(oauthTimestamp, out var timestamp);
            form.TryGetValue("oauth_version", out var oauthVersion);

            authRequest.ConsumerKey = oauthConsumerKey;
            authRequest.Nonce = oauthNonce;
            authRequest.SignatureMethod = oauthSignatureMethod;
            authRequest.Timestamp = timestamp;
            authRequest.Version = oauthVersion;

            using (var hmac = new HMACSHA1(Encoding.ASCII.GetBytes(SharedSecret)))
            {
                var gradePassbackXml = System.IO.File.ReadAllText(@"Controllers\GradePassback.xml");
                var gradePassbackXmlByteArray = Encoding.ASCII.GetBytes(gradePassbackXml);
                var bodyHashByteArray = hmac.ComputeHash(gradePassbackXmlByteArray);
                authRequest.BodyHash = Convert.ToBase64String(bodyHashByteArray);
                authRequest.Signature = authRequest.GenerateSignature(SharedSecret);
            }

            // Build the Authorization header
            var authorizationHeader = new StringBuilder(OAuthConstants.AuthScheme).Append(" ");
            foreach (var key in RequiredOauthAuthorizationHeaderParameters)
            {
                authorizationHeader.AppendFormat("{0}=\"{1}\",", key,
                    WebUtility.UrlEncode(authRequest.Parameters[key]));
            }

            return AuthenticationHeaderValue.Parse(authorizationHeader.ToString(0, authorizationHeader.Length - 1));
        }

        private static async Task PostRequest(string destinationUrl, AuthenticationHeaderValue authorization)
        {
            var body = System.IO.File.ReadAllText(@"Controllers\GradePassback.xml");
            Client.DefaultRequestHeaders.Authorization = authorization;
            var stringContent = new StringContent(body, Encoding.UTF8, "application/xml");
            var response = await Client.PostAsync(destinationUrl, stringContent);
            var responseString = await response.Content.ReadAsStringAsync();
        }
    }
}