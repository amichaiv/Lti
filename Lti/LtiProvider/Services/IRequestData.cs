using LtiProvider.Models;
using Microsoft.AspNetCore.Http;

namespace LtiProvider.Services
{
    public interface IRequestData
    {
        string SharedSecret { get; }
        void Add(HttpRequest httpRequest);
        LtiRequestData Get();
        void Clear();
    }
}