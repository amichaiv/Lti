using System;
using System.Collections.Generic;
using LtiLibrary.NetCore.Common;
using LtiProvider.Models;
using LtiProvider.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using LtiLibrary.NetCore.Clients;
using LtiLibrary.NetCore.Lis.v1;
using LtiProvider.ViewModel;
using Newtonsoft.Json.Linq;
using Membership = LtiLibrary.NetCore.Lis.v2.Membership;

namespace LtiProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipsController : Controller
    {
        #region Constants

        private const string SharedSecret = "secret";

        #endregion

        #region Private Members

        private readonly IRequestData _requestData;

        #endregion

        #region Constructors

        public MembershipsController(IRequestData requestData)
        {
            _requestData = requestData;
        }

        #endregion

        #region Public Methods

        [HttpPost]
        public IActionResult Connect()
        {
            _requestData.Clear();
            SaveRequestData(Request);
            return View("Memberships");
        }

        public async Task<IActionResult> Index()
        {
            LtiRequestData data = _requestData.Get();
            using (var client = new HttpClient())
            {
                ClientResponse<List<Membership>> clientResponse =
                    await MembershipClient.GetMembershipAsync(
                        client, data.CustomContextMembershipsUrl, 
                        data.OAuthConsumerKey, SharedSecret,
                        rlid:data.ResourceLinkId);
                var response = clientResponse.HttpResponse;
                var responseArray = response.Split(Environment.NewLine);
                var jsonElement = responseArray[responseArray.Length - 1];
                var jObject = JObject.Parse(jsonElement);
                var rootObject = jObject.ToObject<RootObject>();
                var membershipSubject = rootObject.pageOf.membershipSubject;
                var membershipViewModel =
                    new MembershipViewModel(data.ContextTitle, data.ResourceLinkTitle, membershipSubject);
                return View(membershipViewModel);
            }
        }

        #endregion

        #region Private Methods

        private void SaveRequestData(HttpRequest request)
        {
            var form = request.Form;
            form.TryGetValue("roles", out var roles);
            if (!Enum.TryParse(roles.ToString(), out ContextRole contextRole))
            {
                contextRole = ContextRole.Learner;
            }
            form.TryGetValue("context_title", out var contextTitle);
            form.TryGetValue("resource_link_id", out var resourceLinkId);
            form.TryGetValue("resource_link_title", out var resourceLinkTitle);
            form.TryGetValue("custom_context_memberships_url", out var customContextMembershipsUrl);
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
                CustomContextMembershipsUrl = customContextMembershipsUrl,
                OAuthNonce = oauthNonce,
                OAuthSignatureMethod = oauthSignatureMethod,
                OAuthTimestamp = timestamp,
                OAuthVersion = oauthVersion,
                Role = contextRole,
                ResourceLinkId = resourceLinkId,
                ResourceLinkTitle = resourceLinkTitle,
                ContextTitle = contextTitle
            };
            _requestData.Add(ltiRequestData);
        }

        #endregion
    }
}