
angular.module('happyDay', ['firebase'])

  .controller('DayController', function($scope, $firebaseArray){
    var dayReview = this
    var fire = new Firebase('https://hackacracka.firebaseio.com/reviews');
    dayReview.reviews = $firebaseArray(fire);

    dayReview.addReview = function(){
      console.log('Hello, world')
      dayReview.reviews.$add({
        text: dayReview.newDayReview
      }) ;
      dayReview.newDayReview = '';
    };

  })
