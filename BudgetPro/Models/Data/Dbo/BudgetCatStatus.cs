using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class BudgetCatStatus
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public decimal Budgeted { get; set; }
        public decimal Current { get; set; }
        public decimal Previous { get; set; }
    }
}