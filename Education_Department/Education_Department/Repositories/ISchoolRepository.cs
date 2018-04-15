using Education_Department.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Education_Department.Repositories
{
    interface ISchoolRepository
    {

        List<School> GetAllSchool();
        School GetSchoolById();
        List<School> GetSchoolByDistrictAndSchoolDegree(int districtId, int schoolDegreeId);

        
    }
}
