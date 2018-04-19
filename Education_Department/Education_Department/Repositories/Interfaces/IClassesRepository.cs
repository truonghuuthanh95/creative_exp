using Education_Department.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Education_Department.Repositories.Interfaces
{
    public interface IClassesRepository
    {
        IQueryable<Class> GetClassBySchoolDegree(int id);
    }
}
