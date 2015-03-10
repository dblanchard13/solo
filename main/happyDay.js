
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

  .controller('UserController', function($scope, $firebaseAuth){
    var user = this;


    var ref = new Firebase("https://hackacracka.firebaseio.com/");

    $scope.loggedIn = ref.getAuth();

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

    user.signIn = function(email, password){
      ref.authWithPassword({
        email    : email.toString(),
        password : password.toString()
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });    
    };

    user.checkUser = function(){
      var authData = ref.getAuth();
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        $scope.loggedIn = true;
      } else {
        $scope.loggedIn = false;
        console.log("User is logged out");
      }      
    };

    user.logOut = function(){
      var authData = ref.unauth();
      if (authData) {
        $scope.loggedIn = true;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        $scope.loggedIn = false;
        console.log("User is logged out");
      }      
    };

  })

 //  .controller('AuthCtrl', [
 //   '$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
 //     var ref = new Firebase('https://angularfireauth.firebaseio.com/');
 //     $rootScope.auth = $firebaseAuth(ref);
     
 //     $scope.signIn = function () {
 //       $rootScope.auth.$login('password', {
 //         email: $scope.email,
 //         password: $scope.password
 //       }).then(function(user) {
 //         $rootScope.alert.message = '';
 //       }, function(error) {
 //         if (error = 'INVALID_EMAIL') {
 //           console.log('email invalid or not signed up — trying to sign you up!');
 //           $scope.signUp();
 //         } else if (error = 'INVALID_PASSWORD') {
 //           console.log('wrong password!');
 //         } else {
 //           console.log(error);
 //         }
 //       });
 //     }

 //     $scope.signUp = function() {
 //       $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
 //         if (!error) {
 //           $rootScope.alert.message = '';
 //         } else {
 //           $rootScope.alert.class = 'danger';
 //           $rootScope.alert.message = 'The username and password combination you entered is invalid.';
 //         }
 //       });
 //     }
 //   }
 // ])

 //  .controller('AlertCtrl', [
 //   '$scope', '$rootScope', function($scope, $rootScope) {
 //     $rootScope.alert = {};
 //   }
 // ]);
