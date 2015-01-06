using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class Invitation
    {
        public int Id { get; set; }
        //[Required]
        public string FromUserName { get; set; }
        //[Required]
        public int HouseholdId { get; set; }
        public string UserHouse { get; set; }
    }

   
}