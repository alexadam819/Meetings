var myApp = angular.module('myApp', ['ngRoute',
									 'firebase',
									 'appControllers']).constant('FIREBASE_URL', 'https://scorching-inferno-5066.firebaseio.com/');

var appControllers = angular.module('appControllers', ['firebase']);


//This is so if a user who is not logged in tries to navigate to a page that requries authentication
myApp.run(['$rootScope', '$location', function($rootScope,$location){
	$rootScope.$on('$routeChangeError', 
		function(event, next, previous, error){
			//Some reason we are hitting this every time. Need to figure this out
			if(error === 'AUTH_REQUIRED'){
				$rootScope.message = 'Sorry you must login to access that page';
				$location.path('/login');
				console.log('HERE');
			};
		});
}]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/checkins/:uId/:mId', {
			templateUrl: 'views/checkins.html',
			controller: 'CheckInsController'
		}).
		when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController',
			resolve : {
				currentAuth : function(Authentication){
					return Authentication.requireAuth();
				}
			}  
		}).
		otherwise({
			redirectTo: '/login'
		});
}]);