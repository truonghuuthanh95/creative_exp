using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Education_Department.Models.DAO;
using Education_Department.Models.DTO;
using Education_Department.Repositories;
using Education_Department.Repositories.Interfaces;
using OfficeOpenXml;

namespace Education_Department.Controllers
{
    public class RegistrationCreativeExpController : ApiController
    {
        IRegistrationCreativeExpRepository _registrationCreativeExpRepository;
        IProgramRepository _programRepository;

        public RegistrationCreativeExpController(IRegistrationCreativeExpRepository registrationCreativeExpRepository, IProgramRepository programRepository)
        {
            _registrationCreativeExpRepository = registrationCreativeExpRepository;
            _programRepository = programRepository;
        }




        // GET: api/Registration_Creative_Exp
        [Route("api/getCreativeExpByProgramId/{id}")]
        public IQueryable<Registration_Creative_Exp> GetRegistration_Creative_Exp(int id)
        {
            return _registrationCreativeExpRepository.GetRegistrationCreativeExpByProgramId(id);
        }

        [HttpPost]
        [ResponseType(typeof(Registration_Creative_Exp))]
        public IHttpActionResult PostRegistration_Creative_Exp(RegistrationDAO registrationDAO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Registration_Creative_Exp registration_Creative_Exp = new Registration_Creative_Exp();

            registration_Creative_Exp.school_id = registrationDAO.school_id;
            registration_Creative_Exp.student_quantity = registrationDAO.student_quantity;
            registration_Creative_Exp.creator = registrationDAO.creator;
            registration_Creative_Exp.date_registed = registrationDAO.date_registed;
            registration_Creative_Exp.day_session_id = registrationDAO.day_session_id;
            registration_Creative_Exp.class_id = registrationDAO.class_id;
            registration_Creative_Exp.position_id = registrationDAO.position_id;
            registration_Creative_Exp.program_id = registrationDAO.program_id;
            registration_Creative_Exp.school_degree_id = registrationDAO.school_degree_id;

            var registrationAdded =_registrationCreativeExpRepository.SaveRegistrationCreativeExp(registration_Creative_Exp);
            return Ok(registrationAdded);
        }
        [HttpGet]
        [Route("api/exportToExelByProgramId/{id}")]
        public async Task<HttpResponseMessage> RegistrationExportToExelByProgramIdAsync(int id)
        {
            string fileName = string.Concat("trainghiemsangtao.xlsx");
            string filePath = HttpContext.Current.Server.MapPath("~/Report/" + fileName);

            Program program = _programRepository.GetProgramById(id);
            List<Registration_Creative_Exp> listExp = _registrationCreativeExpRepository.GetRegistrationCreativeExpByProgramId(id).ToList();

            await Services.ExportExcel.GenerateXLS(listExp, filePath);

            HttpResponseMessage result = null;
            result = Request.CreateResponse(HttpStatusCode.OK);
            result.Content = new StreamContent(new FileStream(filePath, FileMode.Open));
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = fileName;

            return result;   
        }

    }
}