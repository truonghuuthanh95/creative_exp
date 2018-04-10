namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Session_A_Day
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Session_A_Day()
        {
            Day_Type_Enable_Section_A_Day = new HashSet<Day_Type_Enable_Section_A_Day>();
            Registration_Creative_Exp = new HashSet<Registration_Creative_Exp>();
        }

        public int id { get; set; }

        [StringLength(15)]
        public string name { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Day_Type_Enable_Section_A_Day> Day_Type_Enable_Section_A_Day { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Registration_Creative_Exp> Registration_Creative_Exp { get; set; }
    }
}
