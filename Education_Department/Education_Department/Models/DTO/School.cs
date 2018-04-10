namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("School")]
    public partial class School
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public School()
        {
            Person_Reponsibility = new HashSet<Person_Reponsibility>();
            Registration_Creative_Exp = new HashSet<Registration_Creative_Exp>();
        }

        public int id { get; set; }

        [StringLength(100)]
        public string name { get; set; }

        public int? district_id { get; set; }

        [StringLength(100)]
        public string address { get; set; }

        public int? school_type { get; set; }

        public int? province_id { get; set; }

        [StringLength(50)]
        public string school_code { get; set; }

        public int? school_degree_id { get; set; }

        public virtual District District { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Person_Reponsibility> Person_Reponsibility { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Registration_Creative_Exp> Registration_Creative_Exp { get; set; }

        public virtual School_Type School_Type1 { get; set; }

        public virtual School_Degee School_Degee { get; set; }
    }
}
