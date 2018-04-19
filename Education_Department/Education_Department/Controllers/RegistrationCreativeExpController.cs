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



           
            //ExcelPackage pck = new ExcelPackage();
            //ExcelWorksheet ws = pck.Workbook.Worksheets.Add("trainghiemsangtao");

            //ws.Cells["A1"].Value = "Tên chủ đề: " + program.name;
            //ws.Cells["A4"].Value = "STT";
            //ws.Cells["B4"].Value = "Tên Trường";
            //ws.Cells["C4"].Value = "Ngày Tham Gia";
            //ws.Cells["D4"].Value = "Buổi";
            //ws.Cells["E4"].Value = "Số Lượng";
            //ws.Cells["F4"].Value = "Tên Người Đăng Kí";
            //ws.Cells["G4"].Value = "Cấp Trường";
            //ws.Cells["H4"].Value = "Ngày Đăng Kí";

            //int rowStart = 5;
            //int index = 1;
            //foreach (var item in listExp)
            //{
            //    ws.Cells[string.Format("A{0}", rowStart)].Value = index;
            //    ws.Cells[string.Format("B{0}", rowStart)].Value = item.School.name;
            //    ws.Cells[string.Format("C{0}", rowStart)].Value = item.date_registed;
            //    ws.Cells[string.Format("D{0}", rowStart)].Value = item.Session_A_Day.name;
            //    ws.Cells[string.Format("E{0}", rowStart)].Value = item.student_quantity;
            //    ws.Cells[string.Format("F{0}", rowStart)].Value = item.creator;
            //    ws.Cells[string.Format("G{0}", rowStart)].Value = item.School.School_Degee.name;
            //    ws.Cells[string.Format("H{0}", rowStart)].Value = item.created_at;
            //    //rowStart++;
            //    //index++;
            //}
            //ws.Cells["A:AZ"].AutoFitColumns();
            //var response = Request.CreateResponse();
            //response.Content = 
            //    new StringContent("application / vnd.openxmlformats - officedocument.spreadsheetml.sheet", 
            //    System.Text.Encoding.Unicode); 
            
            //response.Headers.Add("content-disposition", "attackment: filename=" + "trainghiemsangtao.xlsx");
            //response.Content = new StreamContent(pck.Stream);
            
        }

    }
}