using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education_Department.Models.DTO;

namespace Education_Department.Repositories
{
    public class SchoolRepository : ISchoolRepository
    {
        private Creative_Exp db = new Creative_Exp();
        public List<School> GetAllSchool()
        {
            throw new NotImplementedException();
        }

        public List<School> GetSchoolByDistrictAndSchoolDegree(int districtId, int schoolDegreeId)
        {
            throw new NotImplementedException();
        }

        public School GetSchoolById()
        {
            throw new NotImplementedException();
        }
    }
}