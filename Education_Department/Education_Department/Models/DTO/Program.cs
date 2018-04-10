namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Program")]
    public partial class Program
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Program()
        {
            Program_Required_District = new HashSet<Program_Required_District>();
            Program_Required_School_Degree = new HashSet<Program_Required_School_Degree>();
            Registration_Creative_Exp = new HashSet<Registration_Creative_Exp>();
        }

        public int id { get; set; }

        [StringLength(200)]
        public string name { get; set; }

        public int? max_audience { get; set; }

        public bool? isActive { get; set; }

        [StringLength(200)]
        public string address { get; set; }

        [StringLength(50)]
        public string longitude { get; set; }

        [StringLength(50)]
        public string latittude { get; set; }

        public int? day_type_enable_select_id { get; set; }

        public virtual Day_Type_Enable Day_Type_Enable { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Program_Required_District> Program_Required_District { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Program_Required_School_Degree> Program_Required_School_Degree { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Registration_Creative_Exp> Registration_Creative_Exp { get; set; }
    }
}
