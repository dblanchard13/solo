angular.module('happyDay', [])
.controller('dayCtrl', function($scope){
  $scope.days = [{mood: 'happy', body: 'Today', stars: ''}, {mood: 'sad', body: 'Yesterday', stars: ''}, {mood: 'ambivalent', body: 'Day before yesterday', stars: ''}];

  $scope.dayReview = {};

  $scope.addReview = function(){
    console.log('Hello, world')
    $scope.dayReview.mood = $scope.dayReview.mood;
    $scope.dayReview.stars = $scope.dayReview.stars;
    $scope.dayReview.body = $scope.dayReview.body;

    $scope.days.push($scope.dayReview);

    $scope.dayReview = {};
  }

})
.controller('dayReview', function($scope){

})