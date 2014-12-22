using Microsoft.AspNet.Identity;

namespace CoderFoundry.InsightUserStore.Models
{
    public class UserLogin
    {
        public int UserId { get; set; }
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }

        public static implicit operator UserLoginInfo(UserLogin login)  // implicit digit to byte conversion operator
        {
            return new UserLoginInfo(login.LoginProvider, login.ProviderKey);
        }
    }
}