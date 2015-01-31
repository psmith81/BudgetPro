/// <reference path="Controllers/demoController.js" />
(function () {
    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'LocalStorageModule'])

        .run(['$rootScope', '$state', '$stateParams', '$http', '$interval', 'authSvc', 'accountSvc',
    function ($rootScope, $state, $stateParams, $http, $interval, authSvc, accountSvc) {
                  //OnLoad goes here if needed
                  $rootScope.$state = $state;
                  $rootScope.$stateParams = $stateParams;

                  authSvc.fillAuthData();
                  //console.log(authSvc.getUserInfo());
                    
                  //accountSvc.updateAcctBal(3);
                  //console.log = ('update result: [' + rst +']');

                  //var accobj = {
                  //      AccountId: 1,
                  //      Amount: 100,
                  //      SignedAmount: 100,
                  //      Date: "12/18/2014",
                  //      Description: "Add some money for food",
                  //      Updated: "12/20/2014",
                  //      UpdatedByUserId: 35,
                  //      CategoryId: 1,
                  //      Reconciled: false,
                  //      HouseholdId: 1
                  //};
                  //accountSvc.addTransaction(accobj);

                  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                      //For later improved security
                      var authorized = typeof(toState.data) != 'undefined' ? 
                                       ( typeof(toState.data.authenticate) != 'undefined' ? 
                                       authSvc.authentication.isAuth : true ) : true;
                      if (authorized == false) {
                          event.preventDefault();
                          console.log('Not Authorized redirect to landing.');
                          $state.go('landing');
                      }
                  });
              }])

        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
                 function ($stateProvider, $urlRouterProvider, $httpProvider) {

                     $httpProvider.interceptors.push('authInterceptorSvc');

                     // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
                     $urlRouterProvider
                       // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                       // Here we are just setting up some convenience urls.
                       //.when('/', '/')
                       // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                        .when('about', '/about')
                        .when('login', '/login')
                        .when('register', '/register')
                        .when('home', '/home')
                        .when('landing', '/landing')
                        .when('accounts', '/accounts')
                        .when('accountDash', '/accountDash')
                        .when('household', '/household')
                        .when('invitation', '/invitation')
                        .when('categories', '/categories')
                         .when('budgetdash','/budgetDash')
                        .otherwise('/');

                     // Use $stateProvider to configure your states.
                     $stateProvider
                       //.state("logOut", {
                       //    // Use a url of "/" to set a states as the "index".
                       //    url: "/logout",
                       //    templateUrl: '/NgApp/Views/Account/logout.html',
                       //})
                       .state("login", {
                           // Use a url of "/" to set a states as the "index".
                           url: "/login",
                           templateUrl: '/NgApp/Views/Account/login.html',
                       })
                       .state("register", {
                           // Use a url of "/" to set a states as the "index".
                           url: "/register",
                           templateUrl: '/NgApp/Views/Account/register.html',
                       }).state("home", {
                           url: '/',
                           abstract: true,
                           templateUrl: '/NgApp/Views/Home/home.html',
                           data: {
                               displayName: "Home",
                               authenticate: true
                           }
                       })
                       .state("home.dashboard", {
                           // Use a url of "/" to set a states as the "index".
                           url: "",
                           views: {
                               'accountSummaries': {
                                   templateUrl: '/NgApp/Views/Home/accountSummaries.html',
                                   controller: 'accountSummariesController',
                                   resolve: {
                                       houseAccts: ['accountSvc', function (accountSvc) {
                                           return accountSvc.getAccountsByHousehold();
                                       }]
                                   }
                               },
                               'recentTransactions': {
                                   templateUrl: '/NgApp/Views/Home/recentTransactions.html',
                                   controller: 'recentTransactionsController',
                                   resolve: {
                                       recentTrans: ['accountSvc', function(accountSvc){
                                            return accountSvc.getRecentTransByHousehold();
                                       }]
                                   }
                               }
                           },
                           data: {
                               displayName: "Dashboard",
                               authenticate: true
                           }
                       })
                       .state("about", {
                           url: "/about",
                           templateUrl: '/NgApp/Views/About/about.html',
                           data: {
                               displayName: "About",
                               authenticate: true
                           }
                       })
                       .state("landing", {
                           url: "/landing",
                           templateUrl: '/NgApp/Views/Home/landing.html',
                           controller: 'demoController'
                       })
                       .state("accounts", {
                           url: "/accounts",
                           templateUrl: '/NgApp/Views/Home/accounts.html',
                           data: {
                                 displayName: "accounts",
                                 authenticate: true
                           }  
                       })
                       .state("newTransaction", {
                           url: "/accounts/:accountId/newTransaction",
                           templateUrl: '/NgApp/Views/Home/newtransaction.html',
                           controller: 'newTransactionController',
                           data: {
                               displayName: "newTransaction",
                               authenticate: true
                           }
                       })
                       .state("accountDash", {
                           url: "/accounts/:accountId/accountDash",
                           templateUrl: '/NgApp/Views/Home/accountDash.html',
                           controller: 'accountController',
                           data: {
                               displayName: "accountDash",
                               authenticate: true
                           }
                       })
                       .state("household", {
                           url: "/household",
                           templateUrl: '/NgApp/Views/Account/household.html',
                           data: {
                               displayName: "household",
                               authenticate: true
                           }
                       })
                       .state("invitation", {
                           url: "/invitation",
                           templateUrl: '/NgApp/Views/Account/invitation.html',
                           data: {
                               displayName: "invitation",
                               authenticate: true
                           }
                       })
                       .state("categories", {
                           url: "/categories",
                           templateUrl: '/NgApp/Views/Home/categories.html',
                           data: {
                               displayName: "categories",
                               authenticate: true
                           }
                       })
                     .state("budgetdash", {
                         url: "/budgetdash",
                         templateUrl: '/NgApp/Views/Budget/budgetdash.html',
                         data: {
                             displayName: "budgetdash",
                             authenticate: true
                         }
                         //resolve: {
                         //    newBudgetItem: ['accountSvc', '$q', function (accountSvc, $q) {
                         //        var newItem = {
                         //            HouseholdId: null,
                         //            CategoryId: null,
                         //            Description: null,
                         //            Amount: null,
                         //            Expense: null,
                         //            Period: null
                         //        };
                         //        var promise = $q.defer();

                         //        accountSvc.GetHousehold().then(function(data)
                         //        {
                         //            newItem.HouseholdId = data;
                         //            promise.resolve(newItem);
                         //        })
                         //        return promise;
                         //    }]
                         //}
                     })

                     $httpProvider.defaults.withCredentials = true;
                     $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
                 }]);

})();