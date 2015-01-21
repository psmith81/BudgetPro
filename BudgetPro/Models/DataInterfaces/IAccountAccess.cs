using System.Collections.Generic;
using System.Threading.Tasks;
using CoderFoundry.InsightUserStore.Models;
using Insight.Database;
using BudgetPro.Models;

namespace BudgetPro.DataAccess
{
    [Sql(Schema = "dbo")]
    public interface IAccountAccess
    {
        List<Account> GetAccountsByHousehold(int householdId);
        List<RecentTrans> GetRecentTransByHousehold(int householdId);
        void UpdateAccountBalances(int accId);
        bool IsInvitation(string inviteEmail);
        List<Invitation> GetInvitations(string email);
        List<Category> GetCategoriesByHousehold(int householdId);
        List<CategorySum> GetTransSumByCatPeriod(int householdId, int period);
        int GetAcctTransCount(int accountId);
        List<TransactionExp> GetAcctTransactions(AcctTransParam aTParams);
        void UpdateTransactionWithUpdate(Transaction trans);

        // auto procs
        Account SelectAccount(int id);
        void DeleteAccount(int id);
        void UpdateAccount(Account account);
        int InsertAccount(Account account);

        Transaction SelectTranscation(int id);
        void DeleteTransaction(int id);
        void UpdateTransaction(Transaction trans);
        int InsertTransaction(Transaction trans);

        Invitation SelectInvitation(int id);
        void DeleteInvitation(int id);
        void UpdateInvitation(NewInvitation invite);
        int InsertInvitation(NewInvitation invite);

        Category SelectCategory(int id);
        void DeleteCategory(int id);
        void UpdateCategory(Category cate);
        int InsertCategory(Category cate);

        BudgetItem SelectBudgetItem(int id);
        void DeleteBudgetItem(int id);
        void UpdateBudgetItem(BudgetItem budItem);
        int InsertBudgetItem(BudgetItem budItem);
    }
}