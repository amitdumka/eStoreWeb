using eStore.Shared.Models.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace eStore.Shared.Models.Todos
{
    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class CalendarViewModel
    {
        public int OffsetFromSun { get; set; }
        public int NumberOfDays { get; set; }

        public string Name { get; set; }

        public CalendarViewModel(int month, int year)
        {
            DateTime firstDay = new DateTime(year, month, 1);
            OffsetFromSun = (int)firstDay.DayOfWeek;
            NumberOfDays = DateTime.DaysInMonth(year, month);
            Name = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month);
        }
    }

    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class DeleteViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string FilePath { get; set; }
    }

    /// <summary>
    /// @Version: 5.0
    /// </summary>
    public class EditViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        [RegularExpression(@"^(?:[a-zA-Z0-9_\-]*,?){0,3}$", ErrorMessage = "Maximum 3 comma separated tags!")]
        public string Tags { get; set; }

        public bool Public { get; set; }
    }

    public class ErrorViewModel
    {
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }

    public class HomeViewModel
    {
        public IEnumerable<TodoItem> RecentlyAddedTodos { get; set; }
        public IEnumerable<TodoItem> CloseDueToTodos { get; set; }
        public IEnumerable<TodoItem> MonthlyToTodos { get; set; }
        public CalendarViewModel CalendarViewModel { get; set; }
        public IEnumerable<TodoItem> PublicTodos { get; set; }
    }

    public class ManageUsersViewModel
    {
        public IEnumerable<AppUser> Administrators { get; set; }
        public IEnumerable<AppUser> Users { get; set; }
    }

    public class TodoItem
    {
        [Required, Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(450)]
        public string UserId { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Title { get; set; }

        [MaxLength(200)]
        [MinLength(15)]
        [DataType(DataType.MultilineText)]
        public string Content { get; set; }

        public bool Done { get; set; }

        [DataType(DataType.DateTime)]
        [Column("Added")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public DateTime Added { get; set; }

        //[NotMapped]
        //public Instant Added { get; set; }

        [DataType(DataType.DateTime)]
        [Column("DueTo")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public DateTime DueTo { get; set; }

        // [NotMapped]
        //public Instant DueTo { get; set; }

        public FileInfo File { get; set; }

        //[Obsolete ("Property only used for EF-serialization purposes")]
        //[DataType (DataType.DateTime)]
        //[Column ("Added")]
        //[EditorBrowsable (EditorBrowsableState.Never)]
        //public DateTime AddedDateTime
        //{
        //    get=>  Added.ToDateTimeUtc ();
        //    set =>  Added= DateTime.SpecifyKind (value, DateTimeKind.Utc).ToInstant ();
        //}

        //[Obsolete ("Property only used for EF-serialization purposes")]
        //[DataType (DataType.DateTime)]
        //[Column ("DueTo")]
        //[EditorBrowsable (EditorBrowsableState.Never)]
        //public DateTime DuetoDateTime
        //{
        //    get => DueTo.ToDateTimeUtc ();
        //    set =>DueTo= DateTime.SpecifyKind (value, DateTimeKind.Utc).ToInstant ();
        //}

        [NotMapped]
        //TODO: remove this coment and remove notmapped [Column("Tags")]
        [MaxLength(Constants.MAX_TAGS)]
        public IEnumerable<string> Tags { get; set; }

        [Display(Name = "Public")]
        public bool IsPublic { get; set; }

        //TODO: to make TODO list for particular user.
        //[Required]
        //[MaxLength(450)]
        //public string AssignedUserId { get; set; }
        //[Display(Name = "Private")]
        //public bool IsPrivate { get; set; }
    }

    public class FileInfo
    {
        [Required, Key]
        public Guid TodoId { get; set; }

        [MaxLength(500)]
        public string Path { get; set; }

        public long Size { get; set; }
    }

    public class TodoItemCreateViewModel
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Title { get; set; }

        [MaxLength(200)]
        [MinLength(5)]
        [DataType(DataType.MultilineText)]
        public string Content { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime DuetoDateTime { get; set; }

        [RegularExpression(@"^(?:[a-zA-Z0-9_\-]*,?){0,3}$", ErrorMessage = "Maximum 3 comma separated tags!")]
        public string Tags { get; set; }

        public bool Public { get; set; }
    }

    public class ToDoMessage
    {
        public int ToDoMessageId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime OnDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? OverDate { get; set; }
        public string Status { get; set; }
        public bool IsOver { get; set; }
    }

    public class TodoViewModel
    {
        public IEnumerable<TodoItem> Todos { get; set; }
        public IEnumerable<TodoItem> Dones { get; set; }
        public IEnumerable<TodoItem> PublicTodos { get; set; }
        public IEnumerable<TodoItem> AssignedTodos { get; set; }//TODO : new additions
    }
}