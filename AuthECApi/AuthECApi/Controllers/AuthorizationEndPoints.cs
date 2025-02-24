using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthECApi.Controllers
{
    [Route("api/authoriziation")]
    [ApiController]
    public class AuthorizationEndPoints : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpGet("admin-only")]

        public string AdminOnly()
        {
            return "Admin only";
        }

        [Authorize(Roles = "Admin, Teacher")]
        [HttpGet("admin-or-teacher-only")]
        public string AdminOrTeacherOnly()
        {
            return "Admin or teacher only";
        }

        [Authorize(Policy = "HasLibraryId")]
        [HttpGet("library-members-only")]
        public string LibraryMembersOnly()
        {
            return "Library members only";
        }

        [Authorize(Roles = "Teacher", Policy = "FemalesOnly")]
        [HttpGet("apply-for-maternity-leave")]
        public string ApplyForMaternityLeave()
        {
            return "Female teachers only";
        }

        [Authorize(Policy = "FemalesOnly")]
        [Authorize(Policy = "AgeUnder10")]
        [HttpGet("age-under-ten-and-female")]
        public string FemaleAndAgeUnderTen()
        {
            return "Females under age 10 only";
        }
    }
}
