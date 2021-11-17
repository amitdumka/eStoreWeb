using eStore.Database;

//Added
namespace eStore.BL.Triggers
{
    /// <summary>
    /// Base of Trigger
    /// Need to Move to Data Management Layer All Classes in Trigger NameSpace.
    /// </summary>
    public interface ITrigger
    {
        public void OnInsert<T>(eStoreDbContext db, T objectValue);

        public void OnUpdate<T>(eStoreDbContext db, T objectValue);

        public void OnDelete<T>(eStoreDbContext db, T objectValue);

        public void OnInsertOrUpdate<T>(eStoreDbContext db, T objectValue, bool isUpdate);

        public void OnChange<T>(eStoreDbContext db, T objectValue);
    }
}