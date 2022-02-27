using eStore.Database;
using eStore.Shared.Models.Payroll;
using System.Linq;

namespace eStore.Validator
{
    public class DBValidation
    {
        /// <summary>
        /// Check for attendance possible  duplicate entry
        /// </summary>
        /// <param name="db"></param>
        /// <param name="att"></param>
        /// <returns></returns>
        public static bool AttendanceDuplicateCheck(eStoreDbContext db, Attendance att)
        {
            var d = db.Attendances.Where(c => c.AttDate == att.AttDate && c.EmployeeId == att.EmployeeId).Select(c => new { c.AttendanceId }).FirstOrDefault();
            if (d != null)
                return true;
            else
                return false;
        }

        public static bool AttendanceDuplicateCheckWithID(eStoreDbContext db, Attendance att)
        {
            var d = db.Attendances.Where(c => c.AttDate == att.AttDate && c.EmployeeId == att.EmployeeId).Select(c => new { c.AttendanceId }).FirstOrDefault();
            if (d != null)
            {
                if (d.AttendanceId != att.AttendanceId)
                    return true;
            }
            return false;
        }
    }

    public class DBDataChecker
    {
        /// <summary>
        /// Check for Salesman Name exist or not
        /// </summary>
        /// <param name="db"></param>
        /// <param name="name"></param>
        /// <param name="storeid"></param>
        /// <returns></returns>
        public static bool IsSalesmanExists(eStoreDbContext db, string name, int storeid)
        {
            var d = db.Salesmen.Where(c => c.SalesmanName == name && c.StoreId == storeid).FirstOrDefault();
            if (d != null)
                return true;
            else
                return false;
        }
    }
}