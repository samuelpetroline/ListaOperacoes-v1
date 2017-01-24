using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace ApontamentoProducao
{
    public class ErrorHandler : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            actionExecutedContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.BadRequest)
            {
                Content = new StringContent(actionExecutedContext.Exception.Message)
            };

            base.OnException(actionExecutedContext);
        }
    }
}