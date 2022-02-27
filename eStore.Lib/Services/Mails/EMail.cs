using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eStore.Services.Mails
{
    //
    // Summary:
    //     This API supports the ASP.NET Core Identity default UI infrastructure and is
    //     not intended to be used directly from your code. This API may change or be removed
    //     in future releases.
    public interface IEmail
    {
        //
        // Summary:
        //     This API supports the ASP.NET Core Identity default UI infrastructure and is
        //     not intended to be used directly from your code. This API may change or be removed
        //     in future releases.
        public Task SendEmailAsync(string email, string subject, string htmlMessage);

        public Task SendEmailAsync(List<string> emails, string subject, string htmlMessage);
    }

    public interface IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message);

        public Task SendEmailAsync(List<string> emails, string subject, string htmlMessage);
    }

    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(List<string> emails, string subject, string htmlMessage)
        {
            throw new System.NotImplementedException();
        }

        [System.Obsolete]
        async Task IEmailSender.SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Aprajita Retails", MailConfig.UserName));
            message.To.Add(new MailboxAddress(/*"",*/address: email));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = htmlMessage };
            // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
            using var client = new SmtpClient { ServerCertificateValidationCallback = (s, c, h, e) => true };
            await client.ConnectAsync(MailConfig.SMTPAddress, MailConfig.SMTPPort, SecureSocketOptions.Auto);
            // Note: only needed if the SMTP server requires authentication
            await client.AuthenticateAsync(MailConfig.UserName, MailConfig.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }

    public class EMail : IEmail
    {
        // private readonly ISendGridClient _client;
        // private readonly SendGridMessage _message;
        private readonly ILogger _logger;

        public EMail(/*ISendGridClient sendGridClient, SendGridMessage sendGridMessage,*/ ILogger<EMail> logger)
        {
            //_client = sendGridClient;
            //_message = sendGridMessage;
            _logger = logger;

            // _message.SetFrom(new EmailAddress("noreply@amoraitis.todolist.com", "TodoList Team"));
        }

        [System.Obsolete]
        async Task IEmail.SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Aprajita Retails", MailConfig.UserName));
            message.To.Add(new MailboxAddress(/*"",*/address: email));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = htmlMessage };
            // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
            using var client = new SmtpClient { ServerCertificateValidationCallback = (s, c, h, e) => true };
            await client.ConnectAsync(MailConfig.SMTPAddress, MailConfig.SMTPPort, SecureSocketOptions.Auto);
            // Note: only needed if the SMTP server requires authentication
            await client.AuthenticateAsync(MailConfig.UserName, MailConfig.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        async Task IEmail.SendEmailAsync(List<string> emails, string subject, string htmlMessage)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Aprajita Retails", MailConfig.UserName));

            foreach (var item in emails)
            {
                message.To.Add(MailboxAddress.Parse(item));
            }
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = htmlMessage };
            // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
            using var client = new SmtpClient { ServerCertificateValidationCallback = (s, c, h, e) => true };
            await client.ConnectAsync(MailConfig.SMTPAddress, MailConfig.SMTPPort, SecureSocketOptions.Auto);
            // Note: only needed if the SMTP server requires authentication
            await client.AuthenticateAsync(MailConfig.UserName, MailConfig.Password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        // SendGrid Email
        /// <summary>
        ///     Sends an email with the specific parameters
        /// </summary>
        /// <exception cref="Exception"></exception>
        //public async Task SendEmailAsync(string email, string subject, string message)
        //{
        //    _message.AddTo(new EmailAddress(email));
        //    _message.AddContent(MimeType.Html, message);
        //    _message.SetSubject(subject);

        //    // An exception could be thrown in ISendGridClient.SendEmailAsync(), too
        //    // According to their documentation, they don't handle exceptions in the requests
        //    try
        //    {
        //        var result = await _client.SendEmailAsync(_message);
        //        if (result.StatusCode != System.Net.HttpStatusCode.Accepted)
        //        {
        //            _logger.LogError("The email couldn't be sent.");
        //        }
        //    }
        //    catch (Exception exp)
        //    {
        //        _logger.LogError(exp.Message);
        //    }

        //}
    }
}