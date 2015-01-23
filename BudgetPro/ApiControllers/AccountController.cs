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

        [Route("updateTransaction")]
        [HttpPost]
        public IHttpActionResult updateTransaction(Transaction trans)
        {
            //accounts.UpdateTransactionWithUpdate(trans);
            accounts.UpdateTransaction(trans);
            accounts.UpdateAccountBalances(trans.AccountId);
            return Ok();
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
        public IHttpActionResult newInvitation(NewInvitation invite)
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

        [Route("GetInvitations")]
        [HttpGet]
        public List<Invitation> GetInvitations()
        {
            //var email = UserManager.GetEmail(HttpContext.Current.User.Identity.GetUserId<int>());
            var user = UserManager.FindById(HttpContext.Current.User.Identity.GetUserId<int>());
            return accounts.GetInvitations(user.Email);
        }

        [Route("clearInvitation")]
        [HttpPost]
        public IHttpActionResult clearInvitation([FromBody] int inviteId)
        {
            accounts.DeleteInvitation(inviteId);
            return Ok();
        }

        [Route("createCategory")]
        [HttpPost]
        public IHttpActionResult createCategory(Category newCat)
        {
            var household = GetHousehold();
            //var cate = new Category();
            newCat.HouseholdId = household.Id;
            //cate.Name = newCat;
            var results = accounts.InsertCategory(newCat);
            return Ok(results);
        }

        [Route("getCategories")]
        [HttpGet]
        public IHttpActionResult getCategories()
        {   
            var household = GetHousehold();
            //return accounts.GetCategoriesByHousehold(householdId);
            var results = accounts.GetCategoriesByHousehold(household.Id);
            return Ok(results);   
        }

        [Route("getCatSums")]
        [HttpGet]
        public IHttpActionResult getCatSums()
        {
            var household = GetHousehold();
            var results = accounts.GetTransSumByCatPeriod(household.Id, 30);
            return Ok(results);
        }

        [Route("getAccount")]
        [HttpPost]
        public IHttpActionResult getAccount([FromBody] int acctId)
        {
            var results = accounts.SelectAccount(acctId);
            return Ok(results);
        }

        [Route("getAcctTransCount")]
        [HttpPost]
        public IHttpActionResult getAcctTransCount([FromBody] int acctId)
        {
            var results = accounts.GetAcctTransCount(acctId);
            return Ok(results);
        }

        [Route("getAcctTransactions")]
        [HttpPost]
        public IHttpActionResult getAcctTransactions(AcctTransParam aTParams)
        {
            //var accountId = aTParams.accountId;
            //var rowoffset = aTParams.rowoffset;
            //var numrows = aTParams.numrows;
            //var results = accounts.GetAcctTransactions(accountId, rowoffset, numrows);
            var results = accounts.GetAcctTransactions(aTParams);
            
            return Ok(results);
        }

        [Route("addBudgetItem")]
        [HttpPost]
        public IHttpActionResult addBudgetItem(BudgetItem budItem)
        {
            var results = accounts.InsertBudgetItem(budItem);
            return Ok(results);
        }

        [Route("getBudgetItems")]
        [HttpPost]
        public IHttpActionResult getBudgetItems(QueryBudgetItem query)
        {
            var results = accounts.GetBudgetItemsByHousehold(query);
            return Ok(results);
        }

        [Route("deleteBudgetItem")]
        [HttpPost]
        public IHttpActionResult deleteBudgetItem([FromBody] int itemId)
        {
            accounts.DeleteBudgetItem(itemId);
            return Ok();
        }

        [Route("getBudgetStatus")]
        [HttpGet]
        public IHttpActionResult getBudgetStatus()
        {
            var household = GetHousehold();
            var results = accounts.GetBudgetStatus(household.Id);
            return Ok(results);
        }

    }
}
