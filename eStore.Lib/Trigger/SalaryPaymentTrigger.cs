using eStore.Database;

namespace eStore.BL.Triggers
{
    public class SalaryPaymentTrigger : ITrigger
    {
        public void OnChange<SalaryPayment>(eStoreDbContext db, SalaryPayment salary)
        {
            throw new System.NotImplementedException();
        }

        public void OnDelete<SalaryPayment>(eStoreDbContext db, SalaryPayment salary)
        {
            throw new System.NotImplementedException();
        }

        public void OnInsert<SalaryPayment>(eStoreDbContext db, SalaryPayment salary)
        {
            throw new System.NotImplementedException();
        }

        public void OnInsertOrUpdate<SalaryPayment>(eStoreDbContext db, SalaryPayment salary, bool isUpdate)
        {
            throw new System.NotImplementedException();
        }

        public void OnUpdate<SalaryPayment>(eStoreDbContext db, SalaryPayment salary)
        {
            throw new System.NotImplementedException();
        }
    }
}