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
        public int FromUserId { get; set; }
        //[Required]
        public string ToEmail { get; set; }
    }

   
}