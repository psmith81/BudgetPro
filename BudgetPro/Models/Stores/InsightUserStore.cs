using CoderFoundry.InsightUserStore.DataAccess;
using CoderFoundry.InsightUserStore.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoderFoundry.InsightUserStore.Infrastructure
{
    public class InsightUserStore :
        IUserStore<AppUser, int>,
        IUserPhoneNumberStore<AppUser, int>,
        IUserPasswordStore<AppUser, int>,
        IUserLoginStore<AppUser, int>,
        IUserRoleStore<AppUser, int>,
        IUserClaimStore<AppUser, int>,
        IUserEmailStore<AppUser, int>,
        IUserLockoutStore<AppUser, int>,
        IUserSecurityStampStore<AppUser, int>,
        IUserTwoFactorStore<AppUser, int>
    {
        private readonly IUserDataAccess _userData;

        public InsightUserStore(IUserDataAccess userData)
        {
            _userData = userData;
        }

        public void Dispose()
        {
        }

        public Task CreateAsync(AppUser user)
        {
            return _userData.InsertUserAsync(user);
        }

        public Task DeleteAsync(AppUser user)
        {
            return _userData.DeleteUserAsync(user.Id);
        }

        public Task<AppUser> FindByIdAsync(int userId)
        {
            return _userData.SelectUserAsync(userId);
        }

        public Task<AppUser> FindByNameAsync(string userName)
        {
            return _userData.FindUserByUserNameAsync(userName);
        }

        public Task UpdateAsync(AppUser user)
        {
            return _userData.UpdateUserAsync(user);
        }

        public Task<string> GetPhoneNumberAsync(AppUser user)
        {
            return Task.FromResult(user.PhoneNumber);
        }

        public Task<bool> GetPhoneNumberConfirmedAsync(AppUser user)
        {
            return Task.FromResult(user.PhoneNumberConfirmed);
        }

        public Task SetPhoneNumberAsync(AppUser user, string phoneNumber)
        {
            user.PhoneNumber = phoneNumber;
            return Task.FromResult(0);
        }

        public Task SetPhoneNumberConfirmedAsync(AppUser user, bool confirmed)
        {
            return Task.FromResult(user.PhoneNumberConfirmed);
        }

        public Task<string> GetPasswordHashAsync(AppUser user)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(AppUser user)
        {
            return Task.FromResult(!string.IsNullOrEmpty(user.PasswordHash));
        }

        public Task SetPasswordHashAsync(AppUser user, string passwordHash)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public Task AddLoginAsync(AppUser user, UserLoginInfo login)
        {
            return _userData.InsertUserLoginAsync(new UserLogin()
            {
                UserId = user.Id,
                LoginProvider = login.LoginProvider,
                ProviderKey = login.ProviderKey
            });
        }

        public Task<AppUser> FindAsync(UserLoginInfo login)
        {
            return _userData.FindUserByLoginAsync(login.LoginProvider, login.ProviderKey);
        }

        public async Task<IList<UserLoginInfo>> GetLoginsAsync(AppUser user)
        {
            IList<UserLoginInfo> loginInfos = new List<UserLoginInfo>();
            var logins = await _userData.GetLoginsForUserAsync(user.Id);

            foreach (var login in logins)
            {
                loginInfos.Add(login);
            }

            return loginInfos;
        }

        public Task RemoveLoginAsync(AppUser user, UserLoginInfo login)
        {
            UserLogin ulogin = new UserLogin();
            ulogin.UserId = user.Id;
            ulogin.LoginProvider = login.LoginProvider;
            ulogin.ProviderKey = login.LoginProvider;

            return _userData.DeleteUserLoginAsync(ulogin);
        }

        public Task AddToRoleAsync(AppUser user, string roleName)
        {
            return _userData.AddUserToRoleAsync(user.Id, roleName);
        }

        public Task<IList<string>> GetRolesAsync(AppUser user)
        {
            return _userData.GetRolesForUserAsync(user.Id);
        }

        public Task<bool> IsInRoleAsync(AppUser user, string roleName)
        {
            return _userData.IsUserInRoleAsync(user.Id, roleName);
        }

        public Task RemoveFromRoleAsync(AppUser user, string roleName)
        {
            return _userData.RemoveUserFromRoleAsync(user.Id, roleName);
        }

        public Task AddClaimAsync(AppUser user, Claim claim)
        {
            //UserClaim uclaim = new UserClaim();
            //uclaim.UserId = user.Id;
            //uclaim.ClaimType = claim.Type;
            //uclaim.ClaimValue = claim.Value;
            // pbs: The above is the rigorous why for coding it, the code below does the same thing but the parameter to 
            //      InseterUserClaimAsync is coded in line. o

            return _userData.InsertUserClaimAsync(new UserClaim()
            {
                UserId = user.Id,
                ClaimType = claim.Type,
                ClaimValue = claim.Value
            });
        }

        public async Task<IList<Claim>> GetClaimsAsync(AppUser user)
        {
            // code by tp:
            var userClaims = await _userData.GetUserClaimsAsync(user.Id);

            var claims = userClaims
                .Select(x => new Claim(x.ClaimType, x.ClaimValue))
                .ToList();

            // add other app specific claims
            if (user.Name != null)
                claims.Add(new Claim(ClaimTypes.GivenName, user.Name));

            return claims;
        }

        public Task RemoveClaimAsync(AppUser user, Claim claim)
        {
            return _userData.RemoveUserClaimAsync(user.Id, claim.Type);
        }

        public Task<AppUser> FindByEmailAsync(string email)
        {
            return _userData.FindUserByEmailAsync(email);
        }

        public Task<string> GetEmailAsync(AppUser user)
        {
            return Task.FromResult(user.Email);
        }

        public Task<bool> GetEmailConfirmedAsync(AppUser user)
        {
            return Task.FromResult(user.EmailConfirmed);
        }

        public Task SetEmailAsync(AppUser user, string email)
        {
            user.Email = email;
            return Task.FromResult(0);
        }

        public Task SetEmailConfirmedAsync(AppUser user, bool confirmed)
        {
            user.EmailConfirmed = confirmed;
            return Task.FromResult(0);
        }

        public Task<int> GetAccessFailedCountAsync(AppUser user)
        {
            return Task.FromResult(user.AccessFailedCount);
        }

        public Task<bool> GetLockoutEnabledAsync(AppUser user)
        {
            return Task.FromResult(user.LockoutEnabled);
        }

        public Task<DateTimeOffset> GetLockoutEndDateAsync(AppUser user)
        {
            return Task.FromResult(user.LockoutEndDate);
        }

        public Task<int> IncrementAccessFailedCountAsync(AppUser user)
        {
            user.AccessFailedCount += 1;
            return Task.FromResult(user.AccessFailedCount);
        }

        public Task ResetAccessFailedCountAsync(AppUser user)
        {
            user.AccessFailedCount = 0;
            return Task.FromResult(0);
        }

        public Task SetLockoutEnabledAsync(AppUser user, bool enabled)
        {
            user.LockoutEnabled = enabled;
            return Task.FromResult(0);
        }

        public Task SetLockoutEndDateAsync(AppUser user, DateTimeOffset lockoutEnd)
        {
            user.LockoutEndDate = lockoutEnd;
            return Task.FromResult(0);
        }

        public Task<string> GetSecurityStampAsync(AppUser user)
        {
            return Task.FromResult(user.SecurityStamp);
        }

        public Task SetSecurityStampAsync(AppUser user, string stamp)
        {
            user.SecurityStamp = stamp;
            return Task.FromResult(0);
        }

        public Task<bool> GetTwoFactorEnabledAsync(AppUser user)
        {
            throw new NotImplementedException();
        }

        public Task SetTwoFactorEnabledAsync(AppUser user, bool enabled)
        {
            throw new NotImplementedException();
        }
    }
}