﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace Education_Department.Services
{
    public class SendMailService
    {
        public bool sendMailToTeacher()
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
            WebMail.From = "SenderGamilId@gmail.com";

            //Send email  
            //WebMail.Send(to: obj.ToEmail, subject: obj.EmailSubject, body: obj.EMailBody, cc: obj.EmailCC, bcc: obj.EmailBCC, isBodyHtml: true);
            return true;
        }  
      catch (Exception)  
      {
              
                return false; 
  
       }
}
    }
}