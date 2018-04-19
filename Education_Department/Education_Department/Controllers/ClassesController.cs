using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Education_Department.Models.DTO;
using Education_Department.Repositories.Interfaces;

namespace Education_Department.Controllers
{
    public class ClassesController : ApiController
    {
        IClassesRepository _classesRepository;

        public ClassesController(IClassesRepository classesRepository)
        {
            _classesRepository = classesRepository;
        }
        

        [Route("api/class/getClassBySchoolDegree/{id}")]
        public IQueryable<Class> GetClassBySchoolDegree(int id)
        {
            var classes = _classesRepository.GetClassBySchoolDegree(id);
            return classes;
        }
        
    }
}