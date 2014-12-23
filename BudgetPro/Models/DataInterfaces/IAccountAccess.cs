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
        void UpdateInvitation(Invitation trans);
        int InsertInvitation(Invitation trans);

    }
}