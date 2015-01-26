using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class RecentTrans
    {
        public string Date { get; set; }
        public string Category { get; set; }
        public string User { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public string Account { get; set; }
    }
}
