namespace LtiProvider.Models
{
    public class Member
    {
        public string type { get; set; }
        public string resultSourcedId { get; set; }
        public string userId { get; set; }
        public string sourcedId { get; set; }
        public string name { get; set; }
        public string givenName { get; set; }
        public string familyName { get; set; }
        public string email { get; set; }
    }
}