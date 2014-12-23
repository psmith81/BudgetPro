using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Owin;
using BudgetPro.Models;
using CoderFoundry.InsightUserStore.DataAccess;
using System.Data.SqlClient;
using Insight.Database;
using CoderFoundry.InsightUserStore.Models;

namespace BudgetPro.Controllers
{
    [Authorize]
    [RoutePrefix("api/authentication")]
    public class AuthorizationController : ApiController
    {
        private ApplicationUserManager _userManager;
        private IUserDataAccess _userData;

        public AuthorizationController()
        {
            _userData = _userData ?? HttpContext.Current.GetOwinContext().Get<SqlConnection>().As<IUserDataAccess>();
        }

        public AuthorizationController(ApplicationUserManager userManager)
            : this()
        {
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [Route("register")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<bool> Register(UserRegistration newUser)
        {
            if (ModelState.IsValid) { 
            var user = new AppUser(newUser);

            var result = await UserManager.CreateAsync(user, newUser.Password);

            return result.Succeeded;
            }
            //return BadRequest("User was invalid.");
            return false;
        }

        [Route("selectUser")]
        [HttpPost]
        public Task<AppUser> SelectUser([FromBody] int userId)
        {
            var result = _userData.SelectUserAsync(userId);
            return result;
        }

        [Route("createHousehold")]
        [HttpPost]
        public int CreateHousehold(Household newHousehold)
        {
            var householdId = _userData.InsertHousehold(newHousehold);
            _userData.AddUserToHousehold(HttpContext.Current.User.Identity.GetUserId<int>(), householdId);
            return newHousehold.Id;
        }

        [Route("getHousehold")]
        [HttpGet]
        public Household GetHousehold()
        {
            return _userData.GetUserHousehold(HttpContext.Current.User.Identity.GetUserId<int>());
        }

        [Route("leaveHousehold")]
        [HttpGet]
        public void LeaveHousehold()
        {
            _userData.RemoveUserFromHousehold(HttpContext.Current.User.Identity.GetUserId<int>());
        }

        [Route("getUserInfo")]
        [HttpPost]
        public UserInfo getUserInfo()
        {
            return _userData.GetUserInfo(HttpContext.Current.User.Identity.GetUserId<int>());
        }

       
 
    }
}