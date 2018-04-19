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
using Education_Department.Repositories;

namespace Education_Department.Controllers
{
    public class SchoolsController : ApiController
    {

        ISchoolRepository _schoolRepository;

        public SchoolsController(ISchoolRepository schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        // GET: api/Schools
        [Route("api/getSchoolByDistrictIdAndSchoolDegree/{districtId}/{schoolDegreeId}")]
        public IQueryable<School> GetSchoolsByDistrict(int districtId, int schoolDegreeId)
        {
            return _schoolRepository.GetSchoolByDistrictAndSchoolDegree(districtId, schoolDegreeId);
        }     
       

    }
}