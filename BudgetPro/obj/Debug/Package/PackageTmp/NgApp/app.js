(function () {
    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'LocalStorageModule'])

        .run(['$rootScope', '$state', '$stateParams', '$http', '$interval', 'authSvc', 'accountSvc',
    function ($rootScope, $state, $stateParams, $http, $interval, authSvc, accountSvc) {
                  //OnLoad goes here if needed
                  $rootScope.$state = $state;
                  $rootScope.$stateParams = $stateParams;

                  authSvc.fillAuthData();

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
                          console.log('Not Authorized redirect to Login.');
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
                        //.when('logOut', '/logOut')
                        .when('register', '/register')
                        .when('home', '/home')
                        .when('landing', '/landing')
                        .when('accounts', '/accounts')
                         .when('household', '/household')
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
                           templateUrl: '/NgApp/Views/Home/landing.html'
                       })
                       .state("accounts", {
                           url: "/accounts",
                           templateUrl: '/NgApp/Views/Home/accounts.html',
                           data: {
                                 displayName: "About",
                                 authenticate: true
                           }  
                       })
                       .state("newTransaction", {
                           url: "/newTransaction",
                           templateUrl: '/NgApp/Views/Home/newtransaction.html'
                       })
                       .state("household", {
                           url: "/household",
                           templateUrl: '/NgApp/Views/Account/household.html'
                       })

                     $httpProvider.defaults.withCredentials = true;
                     $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
                 }]);

})();