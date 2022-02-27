using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
//Added
namespace eStore.BL.Mails
{
    public static class MailConfig
    {
        public const string UserName = "kumar_amit_dumka@yahoo.co.uk";
        public const string Password = "rcqmhzoazvstxoms";
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

    public static class MLogs
    {
        public static void MailLog(string messages, string? subjects)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Aprajita Retails", MailConfig.UserName));
            message.To.Add(new MailboxAddress(/*"",*/"amitnarayansah@gmail.com"));
            if (subjects != null)
                message.Subject = "AprajitaRetails " + subjects + " ";
            else
                message.Subject = "AprajitaRetails Log:";
            message.Body = new TextPart("plain") { Text = messages };

            using var client = new SmtpClient
            {
                // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                ServerCertificateValidationCallback = (s, c, h, e) => true
            };
            client.Connect(MailConfig.SMTPAddress, MailConfig.SMTPPort, MailConfig.SSL);
            // Note: only needed if the SMTP server requires authentication
            client.Authenticate(MailConfig.UserName, MailConfig.Password);
            client.Send(message);
            client.Disconnect(true);
        }

        public static void MailError(string messages)
        {
            MailLog(messages, "Error Log:");
        }

        public static void MailInfo(string messages)
        {
            MailLog(messages, "Info Log:");
        }

        public static void MailWarning(string messages)
        {
            MailLog(messages, "Warning Log:");
        }
    }

    //https://github.com/jstedfast/MailKit

    //S.No Email Provider SMTP Server(Host ) Port Number
    //1	Gmail smtp.gmail.com  587
    //2	Outlook smtp.live.com   587
    //3	Yahoo Mail  smtp.mail.yahoo.com 465
    //5	Hotmail smtp.live.com   465
    //6	Office365.com smtp.office365.com  5
    //public static void Main(string [] args)
    //{ // Retrieving Messages (via Pop3)
    //    using ( var client = new Pop3Client () )
    //    {
    //        // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
    //        client.ServerCertificateValidationCallback = (s, c, h, e) => true;

    //        client.Connect ("pop.friends.com", 110, false);

    //        client.Authenticate ("joey", "password");

    //        for ( int i = 0 ; i < client.Count ; i++ )
    //        {
    //            var message = client.GetMessage (i);
    //            Console.WriteLine ("Subject: {0}", message.Subject);
    //        }

    //        client.Disconnect (true);
    //    }
    //}

    //IMAP
    //public static void Main(string [] args)
    //{
    //    using ( var client = new ImapClient () )
    //    {
    //        // For demo-purposes, accept all SSL certificates
    //        client.ServerCertificateValidationCallback = (s, c, h, e) => true;

    //        client.Connect ("imap.friends.com", 993, true);

    //        client.Authenticate ("joey", "password");

    //        // The Inbox folder is always available on all IMAP servers...
    //        var inbox = client.Inbox;
    //        inbox.Open (FolderAccess.ReadOnly);

    //        Console.WriteLine ("Total messages: {0}", inbox.Count);
    //        Console.WriteLine ("Recent messages: {0}", inbox.Recent);

    //        for ( int i = 0 ; i < inbox.Count ; i++ )
    //        {
    //            var message = inbox.GetMessage (i);
    //            Console.WriteLine ("Subject: {0}", message.Subject);
    //        }

    //        client.Disconnect (true);
    //    }
    //}
}