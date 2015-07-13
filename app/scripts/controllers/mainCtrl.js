'use strict';

/**
 * @ngdoc function
 * @name rajeshApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rajeshApp
 */
app.controller('MainCtrl', function ($scope) {
 $scope.selectedTab = 'HOME';
 $scope.homeForm = true;
 
 
$scope.selectTab = function(tab){
if(tab == 'HOME'){
	$scope.homeForm	 = true;
}else{
	$scope.homeForm	 = false;
}
$scope.selectedTab = tab;	
}
 
});

