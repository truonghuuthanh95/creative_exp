using Education_Department.Models.DTO;
using Education_Department.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Education_Department.Repositories.Implements
{
    public class ProgramRepository : IProgramRepository
    {
        Creative_Exp _db;

        public ProgramRepository(Creative_Exp db)
        {
            _db = db;
        }

        public IQueryable<Program> GetAllProgram()
        {
            var programs = _db.Programs
                .Where(x => x.isActive == true);
            return programs;
        }

        public Program GetProgramById(int id)
        {
            var program = _db.Programs.Include("Day_Type_Enable.Day_Type_Enable_Section_A_Day.Session_A_Day")
                .Include("Program_Required_District.District")
                .Include("Program_Required_School_Degree.School_Degee")
                .FirstOrDefault(x => x.id == id);
            return program;
        }
    }
}