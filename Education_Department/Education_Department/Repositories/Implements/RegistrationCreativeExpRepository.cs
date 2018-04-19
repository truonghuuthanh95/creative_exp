using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Education_Department.Models.DTO;

namespace Education_Department.Repositories.Implements
{
    public class RegistrationCreativeExpRepository : IRegistrationCreativeExpRepository
    {
        Creative_Exp _db;

        public RegistrationCreativeExpRepository(Creative_Exp db)
        {
            _db = db;
        }

        public IQueryable<Registration_Creative_Exp> GetAllRegistrationCreativeExp()
        {
            var regitrations = _db.Registration_Creative_Exp.Include("Class")
            .Include("School")
                .Include("Session_A_Day")
                .Include("Position");

            return regitrations;
        }
       
        public Registration_Creative_Exp GetRegistrationCreativeExpById(int id)
        {
            var registration = _db.Registration_Creative_Exp.Where(x => x.id == id).First();
            return registration;
        }

        public Registration_Creative_Exp SaveRegistrationCreativeExp(Registration_Creative_Exp registration_Creative_Exp)
        {
            var registration = _db.Registration_Creative_Exp.Add(registration_Creative_Exp);
            _db.SaveChanges();
            return registration;
        }
        
        public IQueryable<Registration_Creative_Exp> GetRegistrationCreativeExpByProgramId(int id)
        {
            var regitrations = _db.Registration_Creative_Exp.Include("Class")
           .Include("School.School_Degee")
               .Include("Session_A_Day")
               .Include("Position")
               .Include("School.District").Where(x => x.program_id == id);

            return regitrations;
        }
        
    }
}