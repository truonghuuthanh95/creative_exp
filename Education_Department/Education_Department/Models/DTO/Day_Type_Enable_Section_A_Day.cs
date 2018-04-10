namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Day_Type_Enable_Section_A_Day
    {
        public int id { get; set; }

        public int? section_a_day_id { get; set; }

        public int? day_type_enable { get; set; }

        public virtual Day_Type_Enable Day_Type_Enable1 { get; set; }

        public virtual Session_A_Day Session_A_Day { get; set; }
    }
}
