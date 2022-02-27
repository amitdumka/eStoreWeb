using eStore.Extensions;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

//TODO: Remove this if it is not revelent
namespace eStore.Ops.Session
{
    public static class SessionName
    {
        public const string UserName = "UserName";
        public const string StoreId = "StoreId";
        public const string StoreCode = "StoreCode";
        public const string StoreName = "StoreName";
        public const string StoreCity = "StoreCity";
        public const string LastLoginTime = "LastLogin";
        public const string AdminAccess = "AdminAccess";
    }

    public static class SessionOps
    {
        public static void Write<T>(ISession session, string KeyName, T ValueData)
        {
            session.Set<T>(KeyName, ValueData);
        }

        public static T Read<T>(ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
    }
}