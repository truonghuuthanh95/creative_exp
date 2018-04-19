using Education_Department.Models.DTO;
using Education_Department.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Education_Department.Repositories.Implements
{
    public class PositionRepository : IPositionRepository
    {
        Creative_Exp _db;

        public PositionRepository(Creative_Exp db)
        {
            _db = db;
        }

        public IQueryable<Position> GetAllPositions()
        {
            var positions = _db.Positions;
            return positions;
        }
    }
}