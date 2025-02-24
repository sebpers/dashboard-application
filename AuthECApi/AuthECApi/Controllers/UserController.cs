using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthECApi.Common;
using AuthECApi.Mapper.User;
using AuthECApi.Models;
using AuthECApi.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AuthECApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppSettings _appSettings;

        public UserController(UserManager<AppUser> userManager, IOptions<AppSettings> appSettings)
        {
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet("user-profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            ClaimsPrincipal user = User;
            
            try
            {
                string userId = user.Claims.First(u => u.Type == CustomClaimTypes.UserId).Value;

                var userModel = await _userManager.FindByIdAsync(userId);

                return Ok(
                    new
                    {
                        userModel?.Email,
                        userModel?.FirstName,
                        userModel?.LastName,
                        userModel?.FullName
                    }
                );
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving user profile", error = e.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserRegistrationRequest userRequest)
        {
            if (userRequest == null || !ModelState.IsValid)
            {
                return BadRequest("Information is not valid: " + userRequest);
            }

            AppUser userModel = userRequest.ToUserRegistrationToAppUser();
            userModel.UserName = userRequest.Email;

            var result = await _userManager.CreateAsync(userModel, userRequest.Password);

            await _userManager.AddToRoleAsync(userModel, userRequest.Role);

            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [AllowAnonymous]
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] UserLoginRequest userRequest)
        {
            var user = await _userManager.FindByEmailAsync(userRequest.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, userRequest.Password))
            {
                var secretKey = _appSettings.JWTSecret ?? throw new InvalidOperationException("Secret key is missing.");
                var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)); // Convert to securiy key

                var userRoles = await _userManager.GetRolesAsync(user);

                ClaimsIdentity claims = new ClaimsIdentity(new Claim[]
                {
                    new Claim(CustomClaimTypes.UserId, user.Id),
                    new Claim(ClaimTypes.Role, userRoles.First()),
                    new Claim("gender", user.Gender),
                    new Claim("age", (DateTime.Now.Year - user.DOB.Year).ToString()),
                });

                if (user.LibraryId != null)
                {
                    claims.AddClaim(new Claim("libraryId", user.LibraryId.ToString()!)); // Ignore warning message since libraryId will never be null here
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(
                        signInKey,
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);


                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect." });
            }
        }
    }
}
