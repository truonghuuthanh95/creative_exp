using Education_Department.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Education_Department.Repositories
{
    public interface IRegistrationCreativeExpRepository
    {
       IQueryable<Registration_Creative_Exp> GetAllRegistrationCreativeExp();
        IQueryable<Registration_Creative_Exp> GetRegistrationCreativeExpByProgramId(int id);
        Registration_Creative_Exp GetRegistrationCreativeExpById(int id);
        Registration_Creative_Exp SaveRegistrationCreativeExp(Registration_Creative_Exp registration_Creative_Exp);
    }
}
