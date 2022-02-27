using eStore.Database;
using eStore.Dl.Services.ToDos.Interfaces;
using eStore.Services.ToDos.Interfaces;
using eStore.Shared.Models.Todos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.Services.ToDos.Services
{
    public class LocalFileStorageService : IFileStorageService
    {
        private readonly string _basePath;

        public LocalFileStorageService(string basePath)
        {
            _basePath = basePath;
        }

        public Task<bool> CleanDirectoryAsync(string targetPath)
        {
            if (String.IsNullOrEmpty(targetPath))
                throw new ArgumentNullException(nameof(targetPath));

            targetPath = Path.Combine(_basePath,
                targetPath);

            if (!Directory.Exists(targetPath))
                return Task.FromResult(false);
            try
            {
                foreach (string file in Directory.GetFiles(targetPath))
                {
                    File.Delete(file);
                }
                return Task.FromResult(true);
            }
            catch (Exception)
            {
                return Task.FromResult(false);
            }
        }

        public Task<bool> DeleteFileAsync(string path, string containingFolder)
        {
            if (String.IsNullOrEmpty(path))
                throw new ArgumentNullException(nameof(path));

            path = Path.Combine(_basePath, path);
            try
            {
                if (ExistsAsync(path).Result)
                    File.Delete(path);

                if (containingFolder != null)
                    Directory.Delete(Path.Combine(_basePath, containingFolder));

                return Task.FromResult(true);
            }
            catch (Exception)
            {
                return Task.FromResult(false);
            }
        }

        public Task<bool> ExistsAsync(string path)
        {
            if (String.IsNullOrEmpty(path))
                throw new ArgumentNullException(nameof(path));
            return Task.FromResult(File.Exists(Path.Combine(_basePath, path)));
        }

        public Task<FileStorageInfo> GetFileInfoAsync(string path)
        {
            if (String.IsNullOrEmpty(path))
                throw new ArgumentNullException(nameof(path));

            try
            {
                return Task.FromResult(new FileStorageInfo()
                {
                    Path = path,
                    Size = File.ReadAllBytes(Path.Combine(_basePath, path)).LongLength // Maybe slower than reading the FileInfo and returning the Length
                });
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Task<Stream> GetFileStreamAsync(string path)
        {
            if (String.IsNullOrEmpty(path))
                throw new ArgumentNullException(nameof(path));

            try
            {
                return Task.FromResult<Stream>(File.OpenRead(Path.Combine(_basePath, path)));
            }
            catch (IOException)
            {
                return Task.FromResult<Stream>(null);
            }
        }

        public async Task<bool> SaveFileAsync(string path, Stream stream)
        {
            if (String.IsNullOrEmpty(path) || stream.Equals(Stream.Null))
                throw new ArgumentNullException();

            path = Path.Combine(_basePath, path);
            if (ExistsAsync(path).Result)
                return false;

            try
            {
                string dir = Path.GetDirectoryName(path);
                if (dir != null)
                    Directory.CreateDirectory(dir);
                using (var fStream = File.Create(path))
                {
                    await stream.CopyToAsync(fStream);
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
    }

    public class TodoItemService : ITodoItemService
    {
        private readonly eStoreDbContext _context;
        private readonly IClock _clock;

        public TodoItemService(eStoreDbContext context, IClock clock)
        {
            _context = context;
            _clock = clock;
        }

        public async Task<IEnumerable<TodoItem>> GetItemsByTagAsync(IdentityUser currentUser, string tag)
        {
            return await _context.Todos
                .Where(t => t.Tags.Contains(tag))
                .ToArrayAsync();
        }

        public async Task<bool> AddItemAsync(TodoItem todo, IdentityUser user)
        {
            todo.Id = Guid.NewGuid();
            todo.Done = false;
            todo.Added = _clock.GetCurrentInstant().ToDateTimeUtc();//TODO: Instance is added
            todo.UserId = user.Id;
            todo.File = new Shared.Models.Todos.FileInfo
            {
                TodoId = todo.Id,
                Path = "",
                Size = 0
            };
            _context.Todos.Add(todo);

            var saved = await _context.SaveChangesAsync();
            return saved > 0;
        }

        public async Task<IEnumerable<TodoItem>> GetIncompleteItemsAsync(IdentityUser user)
        {
            return await _context.Todos
                .Where(t => !t.Done && t.UserId == user.Id)
                .ToArrayAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetCompleteItemsAsync(IdentityUser user)
        {
            return await _context.Todos
                .Where(t => t.Done && t.UserId == user.Id)
                .ToArrayAsync();
        }

        public bool Exists(Guid id)
        {
            return _context.Todos
                .Any(t => t.Id == id);
        }

        public async Task<bool> UpdateDoneAsync(Guid id, IdentityUser user)
        {
            var todo = await _context.Todos
                .Where(t => t.Id == id && t.UserId == user.Id)
                .SingleOrDefaultAsync();

            if (todo == null)
                return false;

            todo.Done = !todo.Done;

            var saved = await _context.SaveChangesAsync();
            return saved == 1;
        }

        public async Task<bool> UpdateTodoAsync(TodoItem editedTodo, IdentityUser user)
        {
            var todo = await _context.Todos
                .Where(t => t.Id == editedTodo.Id && t.UserId == user.Id)
                .SingleOrDefaultAsync();

            if (todo == null)
                return false;

            todo.Title = editedTodo.Title;
            todo.Content = editedTodo.Content;
            todo.Tags = editedTodo.Tags;
            todo.IsPublic = editedTodo.IsPublic;

            var saved = await _context.SaveChangesAsync();
            return saved == 1;
        }

        public async Task<TodoItem> GetItemAsync(Guid id)
        {
            return await _context.Todos
                .Include(t => t.File)
                .Where(t => t.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> DeleteTodoAsync(Guid id, IdentityUser currentUser)
        {
            var todo = await _context.Todos
                .Include(t => t.File)
                .Where(t => t.Id == id && t.UserId == currentUser.Id)
                .SingleOrDefaultAsync();

            _context.Todos.Remove(todo);
            _context.Files.Remove(todo.File);

            var deleted = await _context.SaveChangesAsync();
            return deleted > 0;
        }

        public async Task<IEnumerable<TodoItem>> GetRecentlyAddedItemsAsync(IdentityUser currentUser)
        {
            //return await _context.Todos
            //   .Where (t => t.UserId == currentUser.Id && !t.Done
            //    && DateTime.Compare (DateTime.UtcNow.AddDays (1), t.Added.ToDateTimeUtc ()) <= 0)
            //   .ToArrayAsync ();

            return await _context.Todos.Where(t => t.UserId == currentUser.Id && !t.Done && DateTime.Compare(DateTime.UtcNow.AddDays(-1), t.Added) <= 0).ToListAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetDueTo2DaysItems(IdentityUser user)
        {
            return await _context.Todos
                .Where(t => t.UserId == user.Id && !t.Done
                && DateTime.Compare(DateTime.UtcNow.AddDays(1), t.DueTo/*.ToDateTimeUtc ()*/) >= 0)//TODO: Instance is added
                .ToArrayAsync();
        }

        public async Task<IEnumerable<TodoItem>> GetMonthlyItems(IdentityUser user, int month)
        {
            return await _context.Todos
                .Where(t => t.UserId == user.Id && !t.Done)
                .Where(t => t.DueTo/*.ToDateTimeUtc ()*/.Month == month)//TODO: Instance is added
                .ToArrayAsync();
        }

        public async Task<bool> SaveFileAsync(Guid todoId, IdentityUser currentUser, string path, long size)
        {
            var todo = await _context.Todos.Include(t => t.File)
                .Where(t => t.Id == todoId && t.UserId == currentUser.Id)
                .SingleOrDefaultAsync();

            if (todo == null)
                return false;

            todo.File.Path = path;
            todo.File.Size = size;
            todo.File.TodoId = todo.Id;

            var changes = await _context.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<IEnumerable<TodoItem>> GetIncompletePublicItemsAsync()
        {
            return await _context.Todos.Where(t => !t.Done && t.IsPublic).ToArrayAsync();
        }

        //TODO: Need to implement this function
        public Task<IEnumerable<TodoItem>> GetIncompletePrivateItemsAsync(IdentityUser currentUser)
        {
            throw new NotImplementedException();
        }
    }
}