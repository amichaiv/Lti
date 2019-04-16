using LtiProvider.Models;

namespace LtiProvider.Services
{
    public interface IRequestData
    {
        void Add(LtiRequestData ltiRequest);
        LtiRequestData Get();
        void Clear();
    }
}