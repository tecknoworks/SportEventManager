using DataAccessLayer.Helpers;

namespace BusinessLayer.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
