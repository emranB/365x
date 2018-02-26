(function () {

app.controller("homeBottomController", function (
  $state, $stateParams, $scope, $http, $timeout
) {

$scope.properties = [];







var getLocations = function () {
  return $http.get("/static/data/properties.json")
    .then(function (data) {
      $scope.properties = data.data;
      return $scope.properties;
    });
};

var slideItems = function () {
  $timeout(function(){
    var tileWidth = $(".tile").width();

  //   function AnimateRotate(angle,repeat) {
  //     var duration= 1000;
  //     setTimeout(function() {
  //         if(repeat && repeat == "infinite") {
  //             AnimateRotate(angle,repeat);
  //         } else if ( repeat && repeat > 1) {
  //             AnimateRotate(angle, repeat-1);
  //         }
  //     },duration)
  //     var $elem = $('.icon-repeat');
  //
  //     $({deg: 0}).animate({deg: angle}, {
  //         duration: duration,
  //         step: function(now) {
  //             $elem.css({
  //                 'transform': 'rotate('+ now +'deg)'
  //             });
  //         }
  //     });
  // }
  //
  // AnimateRotate(360,"infinite");



    // for (var i=0; i<$scope.properties.length; i++) {
    //   console.log($scope.properties.length);
    //   $timeout(function () {
    //     $(".tile-container").css("transform", "translate(" + (i*tileWidth) + ", " + 0 + ")")
    //   }, (i*1000) );
    // }

  }, 1000);
};



var loadPage = function () {
  getLocations();
  slideItems();
};
loadPage();



$scope.scrollLeft = function () {
  var width = $(".item").width();
  // $(".carousel").scrollLeft(width);

  var leftPos = $('.carousel').scrollLeft();
  $(".carousel").animate({scrollLeft: leftPos - width}, 300);
};



$scope.scrollRight = function () {
    var width = $(".item").width();
    // $(".carousel").scrollLeft(-width);


  var leftPos = $('.carousel').scrollLeft();
  $(".carousel").animate({scrollLeft: leftPos + width}, 300);
};


});

})();
