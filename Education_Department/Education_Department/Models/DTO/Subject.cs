namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Subject")]
    public partial class Subject
    {
        public int id { get; set; }

        [StringLength(20)]
        public string name { get; set; }

        [StringLength(10)]
        public string anotation { get; set; }
    }
}
