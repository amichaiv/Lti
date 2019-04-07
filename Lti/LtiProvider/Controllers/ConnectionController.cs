using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LtiLibrary.AspNetCore.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LtiProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionController : ControllerBase
    {
        public async Task<IActionResult> Connect()
        {
            // Parse and validate the request

            var ltiRequest = await Request.ParseLtiRequestAsync();

            string courseName = ltiRequest.ContextLabel;
            string username = ltiRequest.LisPersonNameFull;
            string redirectHtml =
              "<html>" +
                "<head>" +
                    "<meta http-equiv='refresh' content='0; url=http://localhost:4200/start?username=" + username + "&coursename=" + courseName + "'/>" +
                "</head>" +
              "</html>";

            return new ContentResult()
            {
                Content = redirectHtml,
                ContentType = "text/html"
            };
        }
    }
}