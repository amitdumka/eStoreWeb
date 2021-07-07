using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace eStore.Services.Mails
{
    public static class MailConfig
    {
        public const string UserName = "kumar_amit_dumka@yahoo.co.uk";
        public const string Password = "sjipkhwnjnztjmmk";
        public const string SMTPAddress = "smtp.mail.yahoo.com";
        public const int SMTPPort = 465;
        public const bool SSL = true;
    }
    public static class MyMail
    {
        public static void SendEmail(string subjects, string messages, string toAddress)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Aprajita Retails", MailConfig.UserName));
            message.To.Add(new MailboxAddress(/*"",*/toAddress));
            message.Subject = subjects;
            message.Body = new TextPart("plain") { Text = messages };
            // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
            using var client = new SmtpClient { ServerCertificateValidationCallback = (s, c, h, e) => true };
            client.Connect(MailConfig.SMTPAddress, MailConfig.SMTPPort, SecureSocketOptions.Auto);
            // Note: only needed if the SMTP server requires authentication
            client.Authenticate(MailConfig.UserName, MailConfig.Password);
            client.Send(message);
            client.Disconnect(true);
        }
        public static void SendEmails(string subjects, string messages, string toAddress)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Aprajita Retails", MailConfig.UserName));
            var emailId = toAddress.Split(',');
            foreach (var item in emailId)
            {
                message.To.Add(MailboxAddress.Parse(item));
            }
            message.Subject = subjects;
            message.Body = new TextPart("plain") { Text = messages };
            // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
            using var client = new SmtpClient { ServerCertificateValidationCallback = (s, c, h, e) => true };
            client.Connect(MailConfig.SMTPAddress, MailConfig.SMTPPort, SecureSocketOptions.Auto);
            // Note: only needed if the SMTP server requires authentication
            client.Authenticate(MailConfig.UserName, MailConfig.Password);
            client.Send(message);
            client.Disconnect(true);
        }
    }
}
