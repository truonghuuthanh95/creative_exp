namespace Education_Department.Models.DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Registration_Creative_Exp
    {
        public long id { get; set; }

        public int? school_id { get; set; }

        public int? student_quantity { get; set; }

        public int? grade_id { get; set; }

        [StringLength(50)]
        public string creator { get; set; }

        public int? position_id { get; set; }

        public int? program_id { get; set; }

        public DateTime? date_registed { get; set; }

        public DateTime? created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public int? school_degree_id { get; set; }

        public int? class_id { get; set; }

        public int? day_session_id { get; set; }

        public virtual Class Class { get; set; }

        public virtual Position Position { get; set; }

        public virtual Program Program { get; set; }

        public virtual Session_A_Day Session_A_Day { get; set; }

        public virtual School School { get; set; }
    }
}
