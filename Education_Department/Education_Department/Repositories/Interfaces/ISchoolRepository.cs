using Education_Department.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Education_Department.Repositories
{
    public interface ISchoolRepository
    {

        School GetSchoolById();
        IQueryable<School> GetSchoolByDistrictAndSchoolDegree(int districtId, int schoolDegreeId);

        
    }
}
