using Education_Department.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Education_Department.Services.Utils
{
    public class Utils
    {
        private Creative_Exp db = new Creative_Exp();
        public int checkValidQuantityStudent(int programId, int sesstionAdayId, DateTime time)
        {
            int studentJoinedAllDayNumb = 0;
            int studentJoinedHaftDaynumb = 0;
            var maxStudent = db.Programs.Where(x => x.id == programId).Select(x => x.max_audience).First();
            List<Registration_Creative_Exp> studentJoinedAllDay = db.Registration_Creative_Exp
                .Where(x => x.date_registed == time)
                .Where(x => x.day_session_id == 3).ToList();

            foreach (Registration_Creative_Exp registration in studentJoinedAllDay)
            {
                studentJoinedAllDayNumb += Convert.ToInt16(registration.student_quantity);
            }

            if (sesstionAdayId == 1 || sesstionAdayId == 2)
            {
                List<Registration_Creative_Exp> studentJoinedHaftDay = db.Registration_Creative_Exp
                .Where(x => x.date_registed == time)
                .Where(x => x.day_session_id == sesstionAdayId).ToList();
                foreach (Registration_Creative_Exp registration in studentJoinedHaftDay)
                {
                    studentJoinedHaftDaynumb += Convert.ToInt16(registration.student_quantity);
                }
            }
            
            
            return Convert.ToInt16(maxStudent) - (studentJoinedAllDayNumb + studentJoinedHaftDaynumb);
        }
    }
}