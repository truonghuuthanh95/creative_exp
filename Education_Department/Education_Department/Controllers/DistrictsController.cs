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
    public class DistrictsController : ApiController
    {
        private Creative_Exp db = new Creative_Exp();

        // GET: api/Districts
        public IQueryable<District> GetDistricts()
        {
            return db.Districts;
        }

        // GET: api/Districts/5
        [ResponseType(typeof(District))]
        public async Task<IHttpActionResult> GetDistrict(int id)
        {
            District district = await db.Districts.FindAsync(id);
            if (district == null)
            {
                return NotFound();
            }

            return Ok(district);
        }

        // PUT: api/Districts/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDistrict(int id, District district)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != district.id)
            {
                return BadRequest();
            }

            db.Entry(district).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DistrictExists(id))
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

        // POST: api/Districts
        [ResponseType(typeof(District))]
        public async Task<IHttpActionResult> PostDistrict(District district)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Districts.Add(district);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = district.id }, district);
        }

        // DELETE: api/Districts/5
        [ResponseType(typeof(District))]
        public async Task<IHttpActionResult> DeleteDistrict(int id)
        {
            District district = await db.Districts.FindAsync(id);
            if (district == null)
            {
                return NotFound();
            }

            db.Districts.Remove(district);
            await db.SaveChangesAsync();

            return Ok(district);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DistrictExists(int id)
        {
            return db.Districts.Count(e => e.id == id) > 0;
        }
    }
}