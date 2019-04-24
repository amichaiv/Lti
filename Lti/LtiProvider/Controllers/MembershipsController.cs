using System;
using LtiProvider.Models;
using LtiProvider.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using LtiLibrary.NetCore.Clients;
using LtiProvider.ViewModel;
using Newtonsoft.Json.Linq;

namespace LtiProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipsController : Controller
    {
        private readonly IRequestData _requestData;

        public MembershipsController(IRequestData requestData)
        {
            _requestData = requestData;
        }

        [HttpPost]
        public IActionResult Connect()
        {
            _requestData.Clear();
            _requestData.Add(Request);
            return View("Memberships");
        }

        public async Task<IActionResult> Index()
        {
            var data = _requestData.Get();
            using (var client = new HttpClient())
            { 
                var clientResponse =
                    await MembershipClient.GetMembershipAsync(client, data.CustomContextMembershipsUrl,
                        data.OAuthConsumerKey, _requestData.SharedSecret, data.ResourceLinkId);
                var membershipViewModel = GetMembershipViewModel(data, clientResponse.HttpResponse);
                return View(membershipViewModel);
            }
        }

        private static MembershipViewModel GetMembershipViewModel(LtiRequestData data, string response)
        {
            var responseArray = response.Split(Environment.NewLine);
            var jsonElement = responseArray[responseArray.Length - 1];
            var jObject = JObject.Parse(jsonElement);
            var rootObject = jObject.ToObject<RootObject>();
            var membershipSubject = rootObject.pageOf.membershipSubject;
            return 
                new MembershipViewModel(data.ContextTitle, data.ResourceLinkTitle, membershipSubject);
        }
    }
}