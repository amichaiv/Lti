namespace LtiProvider.Models
{
    public class RootObject
    {
        public string context { get; set; }
        public string type { get; set; }
        public string id { get; set; }
        public PageOf pageOf { get; set; }
    }
}