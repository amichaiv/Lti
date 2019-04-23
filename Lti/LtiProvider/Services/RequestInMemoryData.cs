using System;
using System.Linq;
using LtiLibrary.NetCore.Lis.v1;
using LtiProvider.Data;
using LtiProvider.Models;
using Microsoft.AspNetCore.Http;

namespace LtiProvider.Services
{
    public class RequestInMemoryData : IRequestData
    {
        private readonly RequestDbContext _requestDbContext;

        public RequestInMemoryData(RequestDbContext requestDbContext)
        {
            _requestDbContext = requestDbContext;
        }

        public void Add(HttpRequest request)
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
            _requestDbContext.Request.Add(ltiRequestData);
            _requestDbContext.SaveChangesAsync();
        }

        public LtiRequestData Get() => _requestDbContext.Request.FirstOrDefault();
        public void Clear()
        {
            foreach (var ltiRequestData in _requestDbContext.Request)
            {
                _requestDbContext.Request.Remove(ltiRequestData);
            }

            _requestDbContext.SaveChangesAsync();
        }
    }
}