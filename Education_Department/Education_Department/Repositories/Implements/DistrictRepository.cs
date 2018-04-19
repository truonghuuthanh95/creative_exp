using Education_Department.Models.DTO;
using Education_Department.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Education_Department.Repositories.Implements
{
    public class DistrictRepository : IDistrictRepository
    {
        Creative_Exp _db;
        public DistrictRepository(Creative_Exp db)
        {
            _db = db;
        }

        public IQueryable<District> GetAllDistrict()
        {
            var district = _db.Districts;
            return district;
        }
    }
}