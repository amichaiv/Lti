using System.Collections.Generic;

namespace LtiProvider.Models
{
    public class Membership
    {
        public string status { get; set; }
        public List<string> role { get; set; }
        public List<Message> message { get; set; }
        public Member member { get; set; }
    }
}