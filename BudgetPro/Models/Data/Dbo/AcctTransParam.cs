using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BudgetPro.Models
{
    public class AcctTransParam
    {
        public int accountId { get; set; }
        public int rowoffset { get; set; }
        public int numrows { get; set; }
    }
}
