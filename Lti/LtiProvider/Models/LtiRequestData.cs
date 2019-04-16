using System;
using System.ComponentModel.DataAnnotations;

namespace LtiProvider.Models
{
    public class LtiRequestData
    {
        [Key]
        public Guid Id { get; set; }
        public string OutcomeServiceUrl { get; set; }
        public string ResultSourcedId { get; set; }
        public string OAuthConsumerKey { get; set; }
        public string OAuthNonce { get; set; }
        public string OAuthSignatureMethod { get; set; }
        public long OAuthTimestamp { get; set; }
        public string OAuthVersion { get; set; }
    }
}