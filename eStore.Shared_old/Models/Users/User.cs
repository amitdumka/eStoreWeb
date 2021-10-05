using System;
namespace eStore.Shared.Models.Users
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public bool IsEmployee { get; set; }
        public string FullName { get; set; }
        public int StoreId { get; set; }
        public int? EmployeeId { get; set; }
        public EmpType UserType { get; set; }
    }
}
