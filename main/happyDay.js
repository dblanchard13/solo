
angular.module('happyDay', ['firebase'])

  .controller('DayController', function($scope, $firebaseArray){
    var dayReview = this
    var fire = new Firebase('https://hackacracka.firebaseio.com/reviews');
    dayReview.reviews = $firebaseArray(fire);

    dayReview.addReview = function(){
      console.log('Hello, world')
      dayReview.reviews.$add({
        text: dayReview.newDayReview.summary,
        stars: dayReview.newDayReview.stars
      }) ;
      dayReview.newDayReview = '';
    };

    dayReview.starAvg = function(){
      console.log('reviews - ', dayReview.reviews)
      var counter = 0;
      var starScore = 0;
      dayReview.reviews.forEach(function(star){
        console.log('Star - ', star.stars)
        starScore += star.stars;
        counter ++;
      })
      dayReview.avg = starScore / counter;
      console.log('hmmm - ',dayReview.avg)
      counter = 0;
      starScore = 0;
    };
    // dayReview.starAvg();

  })
