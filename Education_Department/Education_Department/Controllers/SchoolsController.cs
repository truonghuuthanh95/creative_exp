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

namespace Education_Department.Controllers
{
    public class SchoolsController : ApiController
    {
        private Creative_Exp db = new Creative_Exp();
        //public DateTime today()
        //{
        //    //return DateTime.Now();
        //}
        // GET: api/Schools
        [Route("api/getSchoolByDistrictIdAndSchoolDegree/{districtId}/{schoolDegreeId}")]
        public IQueryable<School> GetSchoolsByDistrict(int districtId, int schoolDegreeId)
        {
            return db.Schools
                .Where(x => x.district_id == districtId)
                .Where(x => x.school_degree_id == schoolDegreeId);
        }     
        private bool SchoolExists(int id)
        {
            return db.Schools.Count(e => e.id == id) > 0;
        }

    }
}