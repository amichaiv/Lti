using System.Collections.Generic;

namespace LtiProvider.Models
{
    public class MembershipSubject
    {
        public string type { get; set; }
        public string contextId { get; set; }
        public List<Membership> membership { get; set; }
    }
}