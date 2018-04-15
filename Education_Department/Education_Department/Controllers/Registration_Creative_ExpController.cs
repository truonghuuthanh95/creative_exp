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
using Education_Department.Models.DAO;
using Education_Department.Models.DTO;

namespace Education_Department.Controllers
{
    public class Registration_Creative_ExpController : ApiController
    {
        private Creative_Exp db = new Creative_Exp();

        // GET: api/Registration_Creative_Exp
        public IQueryable<Registration_Creative_Exp> GetRegistration_Creative_Exp()
        {
            return db.Registration_Creative_Exp;
        }

        // GET: api/Registration_Creative_Exp/5
        [ResponseType(typeof(Registration_Creative_Exp))]
        public async Task<IHttpActionResult> GetRegistration_Creative_Exp(long id)
        {
            Registration_Creative_Exp registration_Creative_Exp = await db.Registration_Creative_Exp.FindAsync(id);
            if (registration_Creative_Exp == null)
            {
                return NotFound();
            }

            return Ok(registration_Creative_Exp);
        }

        // PUT: api/Registration_Creative_Exp/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRegistration_Creative_Exp(long id, Registration_Creative_Exp registration_Creative_Exp)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != registration_Creative_Exp.id)
            {
                return BadRequest();
            }

            db.Entry(registration_Creative_Exp).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Registration_Creative_ExpExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Registration_Creative_Exp
        [HttpPost]
        //[ResponseType(typeof(Registration_Creative_Exp))]
        public async Task<IHttpActionResult> PostRegistration_Creative_Exp(RegistrationDAO registrationDAO)
        {
            RegistrationDAO registrationDAO02 = registrationDAO;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Registration_Creative_Exp registration_Creative_Exp = new Registration_Creative_Exp();

            registration_Creative_Exp.school_id = registrationDAO.school_id;
            registration_Creative_Exp.student_quantity = registration_Creative_Exp.student_quantity;
            registration_Creative_Exp.grade_id = registration_Creative_Exp.grade_id;
            registration_Creative_Exp.creator = registrationDAO.creator;
            registration_Creative_Exp.date_registed = registrationDAO.date_registed;
            registration_Creative_Exp.day_session_id = registrationDAO.day_session_id;
            registration_Creative_Exp.class_id = registrationDAO.class_id;

            db.Registration_Creative_Exp.Add(registration_Creative_Exp);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = registration_Creative_Exp.id }, registration_Creative_Exp);
            //return Ok(registrationDAO);
        }

        // DELETE: api/Registration_Creative_Exp/5
        [ResponseType(typeof(Registration_Creative_Exp))]
        public async Task<IHttpActionResult> DeleteRegistration_Creative_Exp(long id)
        {
            Registration_Creative_Exp registration_Creative_Exp = await db.Registration_Creative_Exp.FindAsync(id);
            if (registration_Creative_Exp == null)
            {
                return NotFound();
            }

            db.Registration_Creative_Exp.Remove(registration_Creative_Exp);
            await db.SaveChangesAsync();

            return Ok(registration_Creative_Exp);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Registration_Creative_ExpExists(long id)
        {
            return db.Registration_Creative_Exp.Count(e => e.id == id) > 0;
        }
    }
}