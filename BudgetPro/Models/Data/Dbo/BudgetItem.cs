using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class BudgetItem
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool Expense { get; set; }
        public int Period { get; set; }
    }
}
