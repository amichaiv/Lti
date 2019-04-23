using System;
using System.ComponentModel.DataAnnotations;
using LtiLibrary.NetCore.Lis.v1;
using Microsoft.Extensions.Primitives;

namespace LtiProvider.Models
{
    public class LtiRequestData
    {
        [Key]
        public Guid Id { get; set; }
        public string OutcomeServiceUrl { get; set; }
        public string ResultSourcedId { get; set; }
        public string CustomContextMembershipsUrl { get; set; }
        public string OAuthConsumerKey { get; set; }
        public string OAuthNonce { get; set; }
        public string OAuthSignatureMethod { get; set; }
        public long OAuthTimestamp { get; set; }
        public string OAuthVersion { get; set; }
        public string ResourceLinkId { get; set; }
        public string ResourceLinkTitle { get; set; }
        public ContextRole Role { get; set; }
        public string ContextTitle { get; set; }
    }
}