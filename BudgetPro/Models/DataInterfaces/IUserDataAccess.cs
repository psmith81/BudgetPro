using System.Collections.Generic;
using System.Threading.Tasks;
using CoderFoundry.InsightUserStore.Models;
using Insight.Database;
using BudgetPro.Models;

namespace CoderFoundry.InsightUserStore.DataAccess
{
    [Sql(Schema = "Security")]
    public interface IUserDataAccess
    {
        Task<AppUser> FindUserByUserNameAsync(string userName);
        Task<bool> IsUserInRoleAsync(int userId, string role);
        Task<IList<string>> GetRolesForUserAsync(int userId);
        Task RemoveUserFromRoleAsync(int userId, string role);
        Task<IList<UserLogin>> GetLoginsForUserAsync(int userId);
        Task<AppUser> FindUserByLoginAsync(string loginProvider, string providerKey);
        Task<IList<UserClaim>> GetUserClaimsAsync(int userId);
        Task<AppUser> FindUserByEmailAsync(string email);
        Task RemoveUserClaimAsync(int userId, string claimType);
        Task<bool> AddUserToRoleAsync(int userId, string role);

        [Sql("update [security].[users] set householdId = @householdId where Id = @userId")]
        void AddUserToHousehold(int userId, int householdId);

        [Sql("update [security].[users] set householdId = null where userId = @userId")]
        void RemoveUserFromHousehold(int userId);
       
        [Sql("select * from [security].[households] as h inner join [security].[users] as u on h.id = u.householdId where u.id = @userId ")]
        Household GetUserHousehold(int userId);

        int InsertHousehold(Household entry);


        UserInfo GetUserInfo(int userId);

        // auto procs
        Task<AppUser> SelectUserAsync(int id);
        Task DeleteUserAsync(int id);
        Task UpdateUserAsync(AppUser user);
        Task<int> InsertUserAsync(AppUser user);
        Task InsertUserLoginAsync(UserLogin userLogin);
        Task DeleteUserLoginAsync(UserLogin login);
        Task InsertUserClaimAsync(UserClaim claim);

    }
}