﻿using System;
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
    public class ClassesController : ApiController
    {
        private Creative_Exp db = new Creative_Exp();

        // GET: api/Classes
        public IQueryable<Class> GetClasses()
        {
            return db.Classes;
        }

        // GET: api/Classes/5
        [ResponseType(typeof(Class))]
        public async Task<IHttpActionResult> GetClass(int id)
        {
            Class @class = await db.Classes.FindAsync(id);
            if (@class == null)
            {
                return NotFound();
            }

            return Ok(@class);
        }
        [Route("api/class/getClassBySchoolDegree/{id}")]
        public IQueryable<Class> GetClassBySchoolDegree(int id)
        {
            var classes = db.Classes.Where(x => x.school_degree_id == id);
            return classes;
        }
        // PUT: api/Classes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClass(int id, Class @class)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @class.id)
            {
                return BadRequest();
            }

            db.Entry(@class).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassExists(id))
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

        // POST: api/Classes
        [ResponseType(typeof(Class))]
        public async Task<IHttpActionResult> PostClass(Class @class)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Classes.Add(@class);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = @class.id }, @class);
        }

        // DELETE: api/Classes/5
        [ResponseType(typeof(Class))]
        public async Task<IHttpActionResult> DeleteClass(int id)
        {
            Class @class = await db.Classes.FindAsync(id);
            if (@class == null)
            {
                return NotFound();
            }

            db.Classes.Remove(@class);
            await db.SaveChangesAsync();

            return Ok(@class);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassExists(int id)
        {
            return db.Classes.Count(e => e.id == id) > 0;
        }
    }
}