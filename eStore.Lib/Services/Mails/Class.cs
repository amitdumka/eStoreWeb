using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.ComponentModel.DataAnnotations;

//using WebApi.Helpers;
using System.Globalization;

namespace eStore.Services.Mails
{
    public class Class
    {
    }
}

//https://jasonwatmore.com/post/2020/07/06/aspnet-core-3-boilerplate-api-with-email-sign-up-verification-authentication-forgot-password#app-settings-cs
namespace AprajitaRetails.Services.Mails
{
    /*
     * {
    "title": "Mr",
    "firstName": "Jason",
    "lastName": "Watmore",
    "email": "jason@example.com",
    "password": "my-super-secret-password",
    "confirmPassword": "my-super-secret-password",
    "acceptTerms": true
}
     */

    [Owned]
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }

        // public Account Account { get; set; }
        public string Token { get; set; }

        public DateTime Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime Created { get; set; }
        public string CreatedByIp { get; set; }
        public DateTime? Revoked { get; set; }
        public string RevokedByIp { get; set; }
        public string ReplacedByToken { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;
    }

    public class AppSettings
    {
        public string Secret { get; set; }
        public string EmailFrom { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
    }

    public class AppException : Exception
    {
        public AppException() : base()
        {
        }

        public AppException(string message) : base(message)
        {
        }

        public AppException(string message, params object[] args)
            : base(String.Format(CultureInfo.CurrentCulture, message, args))
        {
        }
    }

    public interface IEmailService
    {
        void Send(string from, string to, string subject, string html);
    }

    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;

        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public void Send(string from, string to, string subject, string html)
        {
            // create message
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(from);
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect(_appSettings.SmtpHost, _appSettings.SmtpPort, SecureSocketOptions.StartTls);
            smtp.Authenticate(_appSettings.SmtpUser, _appSettings.SmtpPass);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}