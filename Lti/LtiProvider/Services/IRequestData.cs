using LtiProvider.Models;
using Microsoft.AspNetCore.Http;

namespace LtiProvider.Services
{
    public interface IRequestData
    {
        void Add(HttpRequest httpRequest);
        LtiRequestData Get();
        void Clear();
    }
}