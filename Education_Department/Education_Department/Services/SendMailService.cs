using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace Education_Department.Services
{
    public class SendMailService
    {
        public bool SendMailToTeacher()
        {
            try { 
            //Configuring webMail class to send email  
            //gmail smtp server  
            WebMail.SmtpServer = "smtp.gmail.com";
            //gmail port to send emails  
            WebMail.SmtpPort = 587;
            WebMail.SmtpUseDefaultCredentials = true;
            //sending emails with secure protocol  
            WebMail.EnableSsl = true;
            //EmailId used to send emails from application  
            WebMail.UserName = "truonghuuthanh95@gmail.com";
            WebMail.Password = "Thanh62550144";

            //Sender email address.  
            WebMail.From = "truonghuuthanh95@gmail.com";

                //Send email  
                WebMail.Send(to: "thanhthse61493@fpt.edu.vn", subject: "truonghuuthanh", body: "truonghuuthanh",isBodyHtml: true);
                return true;
        }  
      catch (Exception ex)  
      {
                Console.WriteLine(ex.ToString());
                return false; 
  
       }
}
    }
}