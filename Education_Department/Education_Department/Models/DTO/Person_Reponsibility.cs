namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Person_Reponsibility
    {
        public int id { get; set; }

        [StringLength(50)]
        public string name { get; set; }

        public bool? isPrincipal { get; set; }

        public int? school_id { get; set; }

        public virtual School School { get; set; }
    }
}
