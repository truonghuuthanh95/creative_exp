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
    public class ProgramsController : ApiController
    {
        private Creative_Exp db = new Creative_Exp();

        // GET: api/Programs
        public IQueryable<Program> GetPrograms()
        {
            var listPrograms = db.Programs
                .Where(x => x.isActive == true);
            return listPrograms;
        }

        // GET: api/Programs/5
        [ResponseType(typeof(Program))]
        public async Task<IHttpActionResult> GetProgram(int id)
        {
            Program program = await db.Programs
                .Include("Day_Type_Enable.Day_Type_Enable_Section_A_Day.Session_A_Day")
                .Include("Program_Required_District.District")
                .Include("Program_Required_School_Degree.School_Degee")            
                .FirstOrDefaultAsync(x => x.id == id);
            if (program == null)
            {
                return NotFound();
            }

            return Ok(program);
        }

        private bool ProgramExists(int id)
        {
            return db.Programs.Count(e => e.id == id) > 0;
        }
    }
}