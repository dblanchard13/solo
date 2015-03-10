
angular.module('happyDay', ['firebase'])

  .controller('DayController', function($scope, $firebaseArray, $rootScope){
    var dayReview = this
    var fire = new Firebase('https://hackacracka.firebaseio.com/reviews');
    dayReview.reviews = $firebaseArray(fire);

    dayReview.addReview = function(){
      console.log('Hello, world')
      dayReview.reviews.$add({
        text: dayReview.newDayReview.summary,
        stars: dayReview.newDayReview.stars,
        user: $rootScope.authData.uid
      });
      dayReview.newDayReview = '';
    };

    dayReview.starAvg = function(){
      var counter = 0;
      var starScore = 0;
      dayReview.reviews.forEach(function(star){
        starScore += star.stars;
        counter ++;
      })
      dayReview.avg = starScore / counter;
      counter = 0;
      starScore = 0;
    };

    dayReview.commentReview = function(){
      dayReview.reviews.$add({
        comment: dayReview.newDayReview.comment
      });
    }
  })

 

  .controller('UserController', function($scope, $firebaseAuth, $rootScope){
    var user = this;
    var ref = new Firebase("https://hackacracka.firebaseio.com/");

    $rootScope.authData;
    // Adds a new user, if user already exists, logs in
    user.addUser = function(email, password){
      console.log('email - ', email)
      console.log('password - ', password)
      ref.createUser({
        email    : email.toString(),
        password : password.toString()
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          if(error.code === 'EMAIL_TAKEN'){
            user.signIn(email, password)
          }
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });      
    };

    user.checkUser = function(){
      var authData = ref.getAuth();
      $rootScope.authData = authData;
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        return true;
      } else {
        console.log("User is logged out");
        return false;
      }      
    };
    user.checkUser();

    user.signIn = function(email, password){
      ref.authWithPassword({
        email    : email.toString(),
        password : password.toString()
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          return false;
        } else {
          console.log("Authenticated successfully with payload:", authData);
          return true;
        }
      })   
    };

    user.logOut = function(){
      var authData = ref.unauth();
      if (authData) {
        user.checkUser();
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        user.checkUser();
        console.log("User is logged out");
      }      
    };

  })

 