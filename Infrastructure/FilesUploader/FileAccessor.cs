using System;
using System.Threading.Tasks;
using Application.Files;
using Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.FilesUploader
{
  public class FileAccessor : IFileAccessor
  {
    private Cloudinary _cloudinary;
    public FileAccessor(IOptions<CloudinarySetting> config)
    {
      var account = new Account(
        config.Value.CloudName,
        config.Value.ApiKey,
        config.Value.ApiSecret
      );
      _cloudinary = new Cloudinary(account);
    }
    public async Task<FileResult> AddFile(IFormFile file)
    {
      if (file.Length > 0)
      {
        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
          File = new FileDescription(file.FileName, stream)
        };



        var result = _cloudinary.Upload(uploadParams);

        if (result.Error != null)
        {
          throw new Exception(result.Error.Message);
        }

        return new FileResult
        {
          PublicId = result.PublicId,
          Url = result.SecureUrl.ToString()
        };
      }
      return null;
    }

    public async Task<string> DeleteFile(string publicId)
    {
      var deleteParams = new DeletionParams(publicId);

      var result = await _cloudinary.DestroyAsync(deleteParams);

      return result.Result == "ok" ? result.Result : null;
    }
  }
}