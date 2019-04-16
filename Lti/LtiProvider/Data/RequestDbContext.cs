using LtiProvider.Models;
using Microsoft.EntityFrameworkCore;

namespace LtiProvider.Data
{
    public class RequestDbContext : DbContext
    {
        public RequestDbContext(DbContextOptions<RequestDbContext> options) : base(options)
        {
            
        }
        public DbSet<LtiRequestData> Request { get; set; }

    }
}