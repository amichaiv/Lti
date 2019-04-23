using LtiProvider.Models;

namespace LtiProvider.ViewModel
{
    public class MembershipViewModel
    {
        public string ContextTitle { get; }
        public string ResourceLinkTitle { get; }

        public MembershipSubject MembershipSubject { get; }

        public MembershipViewModel(string contextTitle, string resourceLinkTitle, MembershipSubject membershipSubject)
        {
            ContextTitle = contextTitle;
            ResourceLinkTitle = resourceLinkTitle;
            MembershipSubject = membershipSubject;
        }
    }
}