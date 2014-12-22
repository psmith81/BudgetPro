using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Insight.Database;
using CoderFoundry.InsightUserStore.DataAccess;
using Microsoft.AspNet.Identity;
using CoderFoundry.InsightUserStore.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BudgetPro.Tests
{
    [TestFixture, TestClass]
    public class Class1
    {
        [Test, TestMethod]
        async public void WithUserMgr()
        {

            var user = new AppUser
            {

                UserName = Guid.NewGuid().ToString(),
                PasswordHash = Guid.NewGuid().ToString(),
                Name = Guid.NewGuid().ToString(),
                Email = Guid.NewGuid().ToString(),

            };

            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Default"].ConnectionString);
            var db = conn.As<IUserDataAccess>();

            var usermgr = new ApplicationUserManager(new CoderFoundry.InsightUserStore.Infrastructure.InsightUserStore(db));

            await usermgr.CreateAsync(user);

        }

        [Test, TestMethod]
        async public void WithInsight()
        {

            var user = new AppUser
            {

                UserName = Guid.NewGuid().ToString(),
                PasswordHash = Guid.NewGuid().ToString(),
                Name = Guid.NewGuid().ToString(),
                Email = Guid.NewGuid().ToString(),

            };

            var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["Default"].ConnectionString);
            var db = conn.As<IUserDataAccess>();

            var usermgr = new ApplicationUserManager(new CoderFoundry.InsightUserStore.Infrastructure.InsightUserStore(db));



            await db.InsertUserAsync(user);

        }
    }



}