
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

  .controller('ReviewController', function($scope, $firebaseArray){

  })

  .controller('UserController', function($scope, $firebaseAuth, $rootScope){
    var user = this;


    var ref = new Firebase("https://hackacracka.firebaseio.com/");

    $scope.loggedIn = false;

    user.addUser = function(email, password){
      console.log('email - ', email)
      console.log('password - ', password)
      ref.createUser({
        email    : email.toString(),
        password : password.toString()
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });      
    };


    user.checkUser = function(){
      var authData = ref.getAuth();
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        return true;
      } else {
        console.log("User is logged out");
        return false;
      }      
    };
    user.checkUser();

    user.authUser = function(email, password){
      if(user.checkUser()){
        console.log('Already signed in!')
        return;
      }
      if(user.signIn(email, password)){
        console.log('signed in!');
        return;
      }
      else{
        user.adduser(email, password);
      }
      
    };

    user.signIn = function(email, password){
      ref.authWithPassword({
        email    : email.toString(),
        password : password.toString()
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          $rootScope.loggedIn = false;
          return false;
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $rootScope.loggedIn = true;
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

 