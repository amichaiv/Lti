using System.Linq;
using LtiProvider.Data;
using LtiProvider.Models;

namespace LtiProvider.Services
{
    public class RequestInMemoryData : IRequestData
    {
        private readonly RequestDbContext _requestDbContext;

        public RequestInMemoryData(RequestDbContext requestDbContext)
        {
            _requestDbContext = requestDbContext;
        }
        public void Add(LtiRequestData ltiRequest)
        {
            _requestDbContext.Request.Add(ltiRequest);
            _requestDbContext.SaveChangesAsync();
        }

        public LtiRequestData Get() => _requestDbContext.Request.FirstOrDefault();
        public void Clear()
        {
            foreach (var ltiRequestData in _requestDbContext.Request)
            {
                _requestDbContext.Request.Remove(ltiRequestData);
            }

            _requestDbContext.SaveChangesAsync();
        }
    }
}