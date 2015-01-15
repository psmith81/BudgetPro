using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal Amount { get; set; }
        public decimal SignedAmount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public DateTime Updated { get; set; }
        public int UpdatedByUserId { get; set; }
        public int CategoryId { get; set; }
        public bool Reconciled { get; set; }
        public int HouseholdId { get; set; }
    }
}

