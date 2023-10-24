using BusinessLayer.Models;

namespace BusinessLayer.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
