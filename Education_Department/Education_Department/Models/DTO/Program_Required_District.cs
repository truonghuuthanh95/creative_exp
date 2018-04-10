namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Program_Required_District
    {
        public int id { get; set; }

        public int? district_id { get; set; }

        public int? program_id { get; set; }

        public virtual District District { get; set; }

        public virtual Program Program { get; set; }
    }
}
