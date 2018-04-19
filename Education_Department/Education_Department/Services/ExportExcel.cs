using Education_Department.Models.DTO;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Education_Department.Services
{
    public class ExportExcel
    {
        public static Task GenerateXLS(List<Registration_Creative_Exp> datasource, string filePath)
        {
            return Task.Run(() =>
            {
                using (ExcelPackage pck = new ExcelPackage())
                {
                    //Create the worksheet 
                    ExcelWorksheet ws = pck.Workbook.Worksheets.Add("trainghiemsangtao");

                    ws.Cells[1, 1].Value = "STT";
                    ws.Cells[1, 2].Value = "Tên Trường";
                    ws.Cells[1, 3].Value = "Cấp Trường";
                    ws.Cells[1, 4].Value = "Lớp";
                    ws.Cells[1, 5].Value = "Quận/Huyện";
                    ws.Cells[1, 6].Value = "Ngày Tham Gia";
                    ws.Cells[1, 7].Value = "Buổi";
                    ws.Cells[1, 8].Value = "Số Lượng";
                    ws.Cells[1, 9].Value = "Tên Người Đăng Kí";
                    ws.Cells[1, 10].Value = "Chức vụ";                  
                    
                    
                    for (int i = 0; i < datasource.Count(); i++)
                    {
                        ws.Cells[i + 2, 1].Value = i + 1;
                        ws.Cells[i + 2, 2].Value = datasource.ElementAt(i).School.name;
                        ws.Cells[i + 2, 3].Value = datasource.ElementAt(i).School.School_Degee.name;
                        ws.Cells[i + 2, 4].Value = datasource.ElementAt(i).Class.name;
                        ws.Cells[i + 2, 5].Value = datasource.ElementAt(i).School.District.name;
                        ws.Cells[i + 2, 6].Value = datasource.ElementAt(i).date_registed.ToString();
                        ws.Cells[i + 2, 7].Value = datasource.ElementAt(i).Session_A_Day.name;
                        ws.Cells[i + 2, 8].Value = datasource.ElementAt(i).student_quantity;
                        ws.Cells[i + 2, 9].Value = datasource.ElementAt(i).creator;
                        ws.Cells[i + 2, 610].Value = datasource.ElementAt(i).Position.name;

                    }

                    using (ExcelRange rng = ws.Cells["A1:J1"])
                    {
                        rng.Style.Font.Bold = true;
                        rng.Style.Fill.PatternType = ExcelFillStyle.Solid;        //Set Pattern for the background to Solid 
                        rng.Style.Fill.BackgroundColor.SetColor(Color.DarkGray);  //Set color to DarkGray 
                        rng.Style.Font.Color.SetColor(Color.Black);
                    }

                    pck.SaveAs(new FileInfo(filePath));
                }
            });
        }
    }
}
