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
using Education_Department.Repositories.Interfaces;
using Education_Department.Services.Utils;
namespace Education_Department.Controllers
{
    public class ProgramsController : ApiController
    {
        IProgramRepository _programRepository;

        public ProgramsController(IProgramRepository programRepository)
        {
            _programRepository = programRepository;
        }


        // GET: api/Programs
        public IQueryable<Program> GetPrograms()
        {
            return _programRepository.GetAllProgram();
        }

        // GET: api/Programs/5
        [ResponseType(typeof(Program))]
        public IHttpActionResult GetProgram(int id)
        {

            Program program = _programRepository.GetProgramById(id);
            if (program == null)
            {
                return NotFound();
            }

            return Ok(program);
        }

        [HttpGet]
        [Route("api/studentQuantityValid/{programId}/{sesstionAdayId}/{time}")]
        public int StudentquantityValid(int programId, int sesstionAdayId, DateTime time)
        {
            Utils utils = new Utils();
            int validStudentNum = utils.checkValidQuantityStudent(programId, sesstionAdayId, time);
            return validStudentNum;
        }
        
    }
}