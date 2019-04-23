using System;
using System.IO;
using System.Linq;
using LtiLibrary.NetCore.Lti.v1;
using LtiProvider.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.Serialization;
using LtiLibrary.NetCore.Clients;

namespace LtiProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutcomesController : Controller
    {
        private const string SharedSecret = "secret";
        private readonly IRequestData _requestData;
        private readonly Random _random = new Random();
        private static readonly XmlSerializer ImsxResponseSerializer;

        static OutcomesController()
        {
            ImsxResponseSerializer = new XmlSerializer(typeof(imsx_POXEnvelopeType), null, null,
                new XmlRootAttribute("imsx_POXEnvelopeResponse"),
                "http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0");
        }

        public OutcomesController(IRequestData requestData)
        {
            _requestData = requestData;
        }

        [HttpPost]
        public IActionResult Connect()
        {
            _requestData.Clear();
            _requestData.Add(Request);
            return View("Outcomes");
        }

        public async Task<IActionResult> ReplaceResultAsync()
        {
            var data = _requestData.Get();
            using (var client = new HttpClient())
            {
                var newGrade = _random.NextDouble();
                var clientResponse = await Outcomes1Client.ReplaceResultAsync(client, data.OutcomeServiceUrl,
                    data.OAuthConsumerKey, SharedSecret,
                    data.ResultSourcedId, newGrade);
                var response = clientResponse.HttpResponse;
                var responseArray = response.Split(Environment.NewLine);
                var imsxElement = responseArray[responseArray.Length - 1];
                if (GetReplaceResponseResult(imsxElement))
                {
                    var outcomeClientResponse = await Outcomes1Client.ReadResultAsync(client, data.OutcomeServiceUrl,
                        data.OAuthConsumerKey, SharedSecret, data.ResultSourcedId);
                    var outcomeResponse = outcomeClientResponse.HttpResponse;
                    var outcomeResponseArray = outcomeResponse.Split(Environment.NewLine);
                    var imsxOutcomeElement = outcomeResponseArray[responseArray.Length - 1];
                    var result = GetReadResponseResult(imsxOutcomeElement);
                    return View("Success", result.ToString("N"));
                }

                return View("Outcomes");
            }
        }

        private bool GetReplaceResponseResult(string imsxElement)
        {
            using (var textReader = new StringReader(imsxElement))
            {
                var imsxEnvelope = ImsxResponseSerializer.Deserialize(textReader) as imsx_POXEnvelopeType;
                var imsxHeader = imsxEnvelope?.imsx_POXHeader.Item as imsx_ResponseHeaderInfoType;
                if (imsxHeader == null)
                {
                    return false;
                }
                var imsxStatus = imsxHeader.imsx_statusInfo.imsx_codeMajor;
                var imsxDescription = imsxHeader.imsx_statusInfo.imsx_description;
                Console.WriteLine($"Replace Result Description: {imsxDescription}");
                return imsxStatus == imsx_CodeMajorType.success;
            }
        }

        private double GetReadResponseResult(string imsxElement)
        {
            var xElement = XElement.Parse(imsxElement);
            XNamespace ad = "http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0";
            var scoreElement = xElement.Descendants(ad + "textString").FirstOrDefault();
            if (scoreElement == null)
            {
                return -1;
            }

            return double.Parse(scoreElement.Value) * 100;
        }
    }
}