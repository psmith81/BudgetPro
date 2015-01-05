using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class NewInvitation
    {
        public int Id { get; set; }
        public int FromUserId { get; set; }
        public string ToEmail { get; set; }
    }
}