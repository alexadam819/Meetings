myApp.factory('CountMeetings', function($firebase, 
	$rootScope, FIREBASE_URL){
		
		var ref = new Firebase(FIREBASE_URL + '/users/' + 
			$rootScope.currentUser.$id + 
			'/meetings');
		
		var meetingsInfo = $firebase(ref);
		
		var meetingsArray = meetingsInfo.$asArray();
		
		meetingsArray.$loaded().then(function(data){
			$rootScope.howManyMeetings = meetingsArray.length;
		});
	
		meetingsArray.$watch(function(data){
			$rootScope.howManyMeetings = meetingsArray.length;
		});
		
		return true;
	});
	
	