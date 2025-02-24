using AuthECApi.Models;
using AuthECApi.Request;

namespace AuthECApi.Mapper.User
{
    public static class UserMapper
    {
        public static AppUser ToUserRegistrationToAppUser(this UserRegistrationRequest userRequest)
        {
            return new AppUser
            {
                FirstName = userRequest.FirstName,
                LastName = userRequest.LastName,
                Email = userRequest.Email,
                FullName = userRequest.FirstName + " " + userRequest.LastName,
                Gender = userRequest.Gender,
                DOB = DateOnly.FromDateTime(DateTime.Now.AddYears(-userRequest.Age)),
                LibraryId = userRequest.LibraryId,
            };
        }
    }
}
