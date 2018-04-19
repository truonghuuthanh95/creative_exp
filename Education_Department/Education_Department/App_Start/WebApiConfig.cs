using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Education_Department.Repositories;
using Education_Department.Repositories.Implements;
using Education_Department.Repositories.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Unity;
using Unity.Lifetime;

namespace Education_Department
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            //Dependence Injection
            var container = new UnityContainer();
            container.RegisterType<IProgramRepository, ProgramRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IClassesRepository, ClassesRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IPositionRepository, PositionRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<Repositories.IRegistrationCreativeExpRepository, RegistrationCreativeExpRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IDistrictRepository, DistrictRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ISchoolRepository, SchoolRepository>(new HierarchicalLifetimeManager());
            
            config.DependencyResolver = new UnityResolver(container);
            
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
