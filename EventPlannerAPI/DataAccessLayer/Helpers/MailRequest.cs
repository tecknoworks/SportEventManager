using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BusinessLayer.Models
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

        public MailRequest(string toEmail, string subject, string body)
        {
            ToEmail = toEmail;
            Subject = subject;
            Body = body;
        }

        public static MailRequest ResetPassword(string ToEmail, string username, string resetLink)
        {
            StringBuilder mailBody = new StringBuilder();
            mailBody.AppendLine("<h1>Password Reset Requested</h1>");
            mailBody.AppendLine("<p>Dear " + username + ",</p>");
            mailBody.AppendLine("<p>We received a request to reset your password for your SportsEventManager account.</p>");
            mailBody.AppendLine("<p>If you didn't make this request, just ignore this email. Otherwise, you can reset your password using this link:</p>");
            mailBody.AppendLine("<a href='" + resetLink + "'>Click here to reset your password</a>");
            mailBody.AppendLine("<p>If you can't click the above link, copy and paste the following URL into your browser:</p>");
            mailBody.AppendLine("<p>" + resetLink + "</p>");
            mailBody.AppendLine("<p>Thanks,</p>");
            mailBody.AppendLine("<p>The Tecknohomies Team</p>");

            return new MailRequest(ToEmail, "Password Reset Request", mailBody.ToString());
        }
    }
}
