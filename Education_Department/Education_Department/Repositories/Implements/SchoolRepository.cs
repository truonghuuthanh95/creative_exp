using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education_Department.Models.DTO;

namespace Education_Department.Repositories
{
    public class SchoolRepository : ISchoolRepository
    {
        Creative_Exp _db;

        public SchoolRepository(Creative_Exp db)
        {
            _db = db;
        }

        public IQueryable<School> GetSchoolByDistrictAndSchoolDegree(int districtId, int schoolDegreeId)
        {
            var schools = _db.Schools
                .Where(x => x.district_id == districtId)
                .Where(x => x.school_degree_id == schoolDegreeId);
            return schools;
        }

        public School GetSchoolById()
        {
            throw new NotImplementedException();
        }
    }
}