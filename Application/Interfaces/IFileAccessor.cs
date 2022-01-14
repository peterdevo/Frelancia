
using System.Threading.Tasks;
using Application.Files;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IFileAccessor
    {
        Task<FileResult> AddFile(IFormFile file);
        Task<string> DeleteFile(string publicId);
    }
}