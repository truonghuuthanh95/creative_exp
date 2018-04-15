using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Education_Department.Models.DAO
{
    public class RegistrationDAO
    {
        

        public int school_id { get; set; }

        public int student_quantity { get; set; }

        public int grade_id { get; set; }

        public string creator { get; set; }

        public int position_id { get; set; }

        public int program_id { get; set; }

        public DateTime date_registed { get; set; }

        public int school_degree_id { get; set; }

        public int class_id { get; set; }

        public int day_session_id { get; set; }
    }
}