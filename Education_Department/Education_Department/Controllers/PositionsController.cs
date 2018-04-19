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

namespace Education_Department.Controllers
{
    public class PositionsController : ApiController
    {
        IPositionRepository _positionRepository;

        public PositionsController(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public IQueryable<Position> GetPositions()
        {
            return _positionRepository.GetAllPositions();
        }

    }
}