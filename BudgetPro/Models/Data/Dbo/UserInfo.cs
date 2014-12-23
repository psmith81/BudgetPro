using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class UserInfo
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
