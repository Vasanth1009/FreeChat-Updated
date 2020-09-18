using System.Collections.Generic;
using System.Threading.Tasks;
using FreeChat.API.Helpers;
using FreeChat.API.Models;

namespace FreeChat.API.Data {
    public interface IChattingRepository {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();
        Task<PagedList<User>> GetUsers (UserParams userParams);
        Task<User> GetUser (int id);
        Task<Photo> GetPhoto (int id);
        Task<Photo> GetMainPhotoForUser (int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}