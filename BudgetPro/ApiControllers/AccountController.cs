using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BudgetPro.Models;
using System.Data.SqlClient;
using Insight.Database;
using BudgetPro.DataAccess;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;


namespace BudgetPro.Controllers
{
    [Authorize]
    [RoutePrefix("api/account")]
    public class AccountController : AuthorizationController
    {
        private IAccountAccess accounts;
        

        public AccountController()
        {
            // Creates connection to SQL
            accounts = HttpContext.Current.GetOwinContext().Get<SqlConnection>().As<IAccountAccess>();

        }

        [Route("addAccount")]
        [HttpPost]
        public int addAccount(Account newAccount)
        {
            //var householdId = InsertAccount(newUserAccount);
            //_userData.AddUserToHousehold(HttpContext.Current.User.Identity.GetUserId<int>(), householdId);
            //return newUserAccount.Id;
            var accountId = accounts.InsertAccount(newAccount);
            return accountId;
        }

        [Route("getAccountsByHousehold")]
        [HttpPost]
        public IHttpActionResult getAccountsByHousehold()
        {
            var household = GetHousehold();
            var results = accounts.GetAccountsByHousehold(household.Id);

            return Ok(results);
        }

        [Route("addTransaction")]
        [HttpPost]
        public IHttpActionResult addTransaction(Transaction newTrans)
        {
            var results = accounts.InsertTransaction(newTrans);

            return Ok(results);
        }

        [Route("getRecentTransByHousehold")]
        [HttpPost]
        public IHttpActionResult getRecentTransByHousehold()
        {
            var household = GetHousehold();
            var results = accounts.GetRecentTransByHousehold(household.Id);

            return Ok(results);
        }

        [Route("updateAccountBalances")]
        [HttpPost]
        public IHttpActionResult updateAccountBalances([FromBody] int accId)
        {
            accounts.UpdateAccountBalances(accId);
            return Ok();
        }

        [Route("newInvitation")]
        [HttpPost]
        public IHttpActionResult newInvitation(Invitation invite)
        {
            var results = accounts.InsertInvitation(invite);
            return Ok(results);
        }

        [Route("isInvitation")]
        [HttpPost]
        public bool isInvitation()
        {
            //var email = UserManager.GetEmail(HttpContext.Current.User.Identity.GetUserId<int>());
            var user = UserManager.FindById(HttpContext.Current.User.Identity.GetUserId<int>());
            var email = user.Email;
            var result = accounts.IsInvitation(user.Email);
            return result;
        }
    }
}
