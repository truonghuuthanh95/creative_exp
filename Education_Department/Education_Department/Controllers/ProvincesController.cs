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
using Education_Department.Models.DAO;
using Education_Department.Models.DTO;

namespace Education_Department.Controllers
{
    public class ProvincesController : ApiController
    {
        private Creative_Exp db = new Creative_Exp();

        // GET: api/Provinces
        public IQueryable<Province> GetProvinces()
        {
            return db.Provinces;
        }

        // GET: api/Provinces/5
        [ResponseType(typeof(Province))]
        public async Task<IHttpActionResult> GetProvince(int id)
        {
            Province province = await db.Provinces.FindAsync(id);
            if (province == null)
            {
                return NotFound();
            }

            return Ok(province);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProvinceExists(int id)
        {
            return db.Provinces.Count(e => e.id == id) > 0;
        }
    }
}