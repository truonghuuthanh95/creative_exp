using Education_Department.Models.DTO;
using Education_Department.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Education_Department.Repositories.Implements
{
    public class ClassesRepository : IClassesRepository
    {
        Creative_Exp _db;

        public ClassesRepository(Creative_Exp db)
        {
            _db = db;
        }

        public IQueryable<Class> GetClassBySchoolDegree(int id)
        {
            var classes = _db.Classes.Where(x => x.school_degree_id == id);
            return classes;
        }
    }
}