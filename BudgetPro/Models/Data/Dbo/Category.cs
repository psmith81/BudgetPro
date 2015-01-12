using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class Category
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Name { get; set; }
    }

    public class CategorySum
    {
        public int Id { get; set; }
        public int HouseholdId { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public double Total { get; set; }
    }
}
