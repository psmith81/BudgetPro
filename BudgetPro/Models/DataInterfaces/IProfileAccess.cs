using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BudgetPro.Models.DataInterfaces
{
    interface IProfileAccess
    {
        Household SelectHousehold(int id);
        int InsertHousehold(Household entry);
        void UpdateHousehold(Household entry);
        void DeleteHoushold(Household entry);
    }
}
