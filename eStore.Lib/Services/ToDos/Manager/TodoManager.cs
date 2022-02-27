using eStore.Database;
using eStore.Services.ToDos.Interfaces;
using eStore.Shared.Models.Todos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Services.ToDos
{
    public class TodoManager
    {
        [Authorize]
        public async Task<HomeViewModel> ListTodoItemAsync(ITodoItemService todoItemService, SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager/*, IFileStorageService fileStorageService*/)
        {
            var currentUser = await userManager.GetUserAsync(signInManager.Context.User);
            if (currentUser == null)
                return null;
            var currentDateTime = DateTime.Now;
            var calendar = new CalendarViewModel(currentDateTime.Month, currentDateTime.Year);
            var recentlyAddedTodos = await todoItemService.GetRecentlyAddedItemsAsync(currentUser);
            var dueTo2daysTodos = await todoItemService.GetDueTo2DaysItems(currentUser);
            var monthlyItems = await todoItemService.GetMonthlyItems(currentUser, currentDateTime.Month);
            var homeViewModel = new HomeViewModel()
            {
                RecentlyAddedTodos = recentlyAddedTodos,
                CloseDueToTodos = dueTo2daysTodos,
                MonthlyToTodos = monthlyItems,
                CalendarViewModel = calendar
            };
            return homeViewModel;
        }
    }

    public class ToDoManager
    {
        public void AddToDoList(eStoreDbContext db, string title, string msg, DateTime duedate)
        {
            ToDoMessage todo = new ToDoMessage
            {
                IsOver = false,
                OnDate = DateTime.Now,
                Message = msg,
                DueDate = duedate,
                Status = "Pending",
                Title = title
            };
            db.ToDoMessages.Add(todo);
            db.SaveChanges();
        }

        public List<ToDoMessage> ListToDoList(eStoreDbContext db)
        {
            return db.ToDoMessages.Where(c => !c.IsOver).OrderByDescending(c => c.DueDate).ToList();
        }

        public void UpDateToDoList(eStoreDbContext db, ToDoMessage todo)
        {
            db.Update(todo);
            db.SaveChanges();
        }
    }
}