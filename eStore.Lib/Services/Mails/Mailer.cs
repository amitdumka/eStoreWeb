using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Threading.Tasks;

namespace eStore.Services.Mails
{
}

namespace AprajitaRetails.Services.Mails
{
    public class SMTPSetting
    {
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }

        //public string Secret { get; set; }
        public string SenderName { get; set; }

        public string SenderEmail { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
    }

    public interface IMailer
    {
        Task SendEmailAsync(string emailId, string subject, string body);

        Task SendEmailsAsync(string emailIds, string subject, string body);
    }

    public class Mailer : IMailer
    {
        private SMTPSetting _smtpSetting;

        public Mailer(SMTPSetting SMTP)
        {
            _smtpSetting = SMTP;
        }

        public async Task SendEmailAsync(string emailId, string subject, string body)
        {
            //https://medium.com/@ffimnsr/sending-email-using-mailkit-in-asp-net-core-web-api-71b946380442
            // create message
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_smtpSetting.SenderName, _smtpSetting.SenderEmail));
                email.To.Add(MailboxAddress.Parse(emailId));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = body };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect(_smtpSetting.SmtpHost, _smtpSetting.SmtpPort, SecureSocketOptions.StartTls);
                smtp.Authenticate(_smtpSetting.SmtpUser, _smtpSetting.SmtpPass);
                smtp.Send(email);
                smtp.Disconnect(true);
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }

        public async Task SendEmailsAsync(string emailIds, string subject, string body)
        {
            //https://medium.com/@ffimnsr/sending-email-using-mailkit-in-asp-net-core-web-api-71b946380442
            // create message
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress(_smtpSetting.SenderName, _smtpSetting.SenderEmail));

                //TODO:  add Mulitple Id  email.To.Add(MailboxAddress.Parse(emailId));

                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = body };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect(_smtpSetting.SmtpHost, _smtpSetting.SmtpPort, SecureSocketOptions.StartTls);
                smtp.Authenticate(_smtpSetting.SmtpUser, _smtpSetting.SmtpPass);
                smtp.Send(email);
                smtp.Disconnect(true);
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }
    }
}