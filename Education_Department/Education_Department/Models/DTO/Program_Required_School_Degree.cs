namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Program_Required_School_Degree
    {
        public int id { get; set; }

        public int? school_degree_id { get; set; }

        public int? program_id { get; set; }

        public virtual Program Program { get; set; }

        public virtual School_Degee School_Degee { get; set; }
    }
}
