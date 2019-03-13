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

                var requestInfo = $"Hello {ltiRequest.LisPersonNameFull}{Environment.NewLine}"
                                  + $"Welcome to CodeValue Lti Tool{Environment.NewLine}"
                                  + $"Moodle Name: {ltiRequest.ToolConsumerInstanceName}{Environment.NewLine}"
                                  + $"Course Name: {ltiRequest.ContextLabel}{Environment.NewLine}"
                                  + $"Tool Title: {ltiRequest.ResourceLinkTitle}{Environment.NewLine}";

                return Ok(requestInfo);
        }
    }
}