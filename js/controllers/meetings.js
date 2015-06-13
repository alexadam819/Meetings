myApp.controller('MeetingsController', 
				function($scope, $firebase) {
	var ref = new Firebase('https://scorching-inferno-5066.firebaseio.com/meetings');
	
	var meetings = $firebase(ref);
	 
	$scope.meetings = meetings.$asObject();
	
	$scope.addMeeting = function() {
		meetings.$push({
			name: $scope.meetingname,
			date: Firebase.ServerValue.TIMESTAMP
		}).then(function() {
			$scope.meetingname = '';
		});
	}; //addMeeting
	
	$scope.deleteMeeting = function(key){
		meetings.$remove(key);
	};
});