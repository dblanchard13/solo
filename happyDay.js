
angular.module('happyDay', [])
.controller('dayCtrl', function($scope){
  $scope.days = [];

  $scope.dayReview = {};

  $scope.addReview = function(){
    console.log('Hello, world')
    firebase.set({user: 'hello', attempt: 'world'})
    $scope.dayReview.date = $scope.dayReview.date;
    $scope.dayReview.stars = $scope.dayReview.stars;
    $scope.dayReview.body = $scope.dayReview.body;

    $scope.days.push($scope.dayReview);

    $scope.dayReview = {};
  }

})
.controller('dayReview', function($scope){

})