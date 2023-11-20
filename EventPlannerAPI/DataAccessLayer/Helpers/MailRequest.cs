using System.Text;

namespace DataAccessLayer.Helpers
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }

        public string OptionalParameter { get; set; }

        public MailRequest(string toEmail, string subject, string body, string optionalParameter = null)
        {
            ToEmail = toEmail;
            Subject = subject;
            Body = body;
            OptionalParameter = optionalParameter;
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
        public static MailRequest ConfirmAccount(string ToEmail, string username, string confirmationLink)
        {
            StringBuilder mailBody = new StringBuilder();
            mailBody.AppendLine("<h1>Account Confirmation Requested</h1>");
            mailBody.AppendLine("<p>Dear " + username + ",</p>");
            mailBody.AppendLine("<p>We sent you a link to confirm your account.</p>");
            mailBody.AppendLine("<p>If you didn't make this request, just ignore this email. Otherwise, you can confirm your account using this link:</p>");
            mailBody.AppendLine("<a href='" + confirmationLink + "'>Click here to confirm your account</a>");
            mailBody.AppendLine("<p>If you can't click the above link, copy and paste the following URL into your browser:</p>");
            mailBody.AppendLine("<p>" + confirmationLink + "</p>");
            mailBody.AppendLine("<p>Thanks,</p>");
            mailBody.AppendLine("<p>The Tecknohomies Team</p>");

            return new MailRequest(ToEmail, "Account Confirmation Request", mailBody.ToString());
        }

        public static MailRequest JoinEventNotification(string toEmail, string userName, string profileImageUrl, string profileLink)
        {
            var mailBody = new StringBuilder();
            mailBody.AppendLine("<h1>New Event Participation</h1>");
            mailBody.AppendLine($"<p>Dear Event Creator,</p>");
            mailBody.AppendLine($"<p>{userName} has joined your event.</p>");
           
            if (!string.IsNullOrEmpty(profileImageUrl))
            {
                mailBody.AppendLine($"<img src='{profileImageUrl}' alt='Profile Picture' />");
            }
            mailBody.AppendLine($"<p>You can view their profile here: <a href='{profileLink}'>{userName}'s Profile</a></p>");
            mailBody.AppendLine("<p>Thanks,</p>");
            mailBody.AppendLine("<p>Your Team</p>");

            return new MailRequest(toEmail, "New Participant for Your Event", mailBody.ToString(), profileImageUrl);
        }

        public static MailRequest CloseEventNotification(string toEmail, string userName, string eventName, string reviewLink)
        {
            var mailBody = new StringBuilder();
            mailBody.AppendLine("<h1>Closed Event</h1>");
            mailBody.AppendLine($"<p>Dear {userName},</p>");
            mailBody.AppendLine($"<p>The event {eventName} has finished or has been closed.</p>");
            mailBody.AppendLine($"<p>Leave a review for the rest of the participants</p>");
            mailBody.AppendLine("<a href='" + reviewLink + "'>Click here to write your review</a>");
            mailBody.AppendLine("<p>If you can't click the above link, copy and paste the following URL into your browser:</p>");
            mailBody.AppendLine("<p>" + reviewLink + "</p>");
            mailBody.AppendLine("<p>Thanks,</p>");
            mailBody.AppendLine("<p>Your Team</p>");

            return new MailRequest(toEmail, "Event Closed", mailBody.ToString());
        }

        public static MailRequest AcceptedToEventNotification(string toEmail, string userName, string newUserUserName, string eventName,string profileImageUrl, string profileLink)
        {
            var mailBody = new StringBuilder();
            mailBody.AppendLine("<h1>New user accepted to Event</h1>");
            mailBody.AppendLine($"<p>Dear {userName},</p>");
            mailBody.AppendLine($"<p>{newUserUserName} has been accepted to the {eventName} event you're attending.</p>");

            if (!string.IsNullOrEmpty(profileImageUrl))
            {
                mailBody.AppendLine($"<img src='{profileImageUrl}' alt='Profile Picture' />");
            }
            mailBody.AppendLine($"<p>You can view their profile here: <a href='{profileLink}'>{newUserUserName}'s Profile</a></p>");
            mailBody.AppendLine("<p>Thanks,</p>");
            mailBody.AppendLine("<p>Your Team</p>");

            return new MailRequest(toEmail, "New Participant accepted to the event you're attending", mailBody.ToString(), profileImageUrl);
        }
    }
}
