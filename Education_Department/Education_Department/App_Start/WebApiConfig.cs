using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
namespace Education_Department
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Json Formater

            //var jsonSetting = config.Formatters.JsonFormatter.SerializerSettings;
            //jsonSetting.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //jsonSetting.Formatting = Formatting.Indented;


            var cors = new EnableCorsAttribute("http://localhost:3000", "*", "*");
            // Web API configuration and services
            config.EnableCors(cors);
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
