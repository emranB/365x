(function () {

app.controller("homeBottomController", function (
  $state, $stateParams, $scope, $http, $timeout, $interval
) {

$scope.timer;
$scope.properties = [];
$scope.currentProperty = {
  img_directory: "",
  img_paths: [],
  title: "",
  neighbourhood: "",
  numberofbedrooms: "",
  amenities: "",
  nearby: "",
  showingPic: {}
};


var getLocations = function () {
  return $http.get("/static/data/properties.json")
    .then(function (data) {
      $scope.properties = data.data;
      return $scope.properties;
    });
};

var setDefaultProperty = function () {
  var defaultProperty = $scope.properties[0];
  return getPropertyImages(defaultProperty);
};

$scope.viewPropertyDetails = function (property) {
    return getPropertyImages(property);
};


var getPropertyImages = function (property) {

  var getImgPaths = function () {
    return $http.get("/api/getImageFilePaths/" + property.id)
      .then(function (data) {
        var img_names = data.data;
        var paths = []; var i = 0;
        angular.forEach(img_names, function (img_name) {
          var url = "/static/data/pics/" + property.img_directory + "/" + img_name;
          var path = {
            id: i,
            path: url,
            text: img_name
          };
          paths.push(path);
          i++;
        });
        return paths;
      });
  };

  var setShowingPic = function (paths) {
    $scope.currentProperty = {
      img_directory: property.img_directory,
      img_paths: paths,
      title: property.name,
      neighbourhood: property.neighbourhood,
      numberofbedrooms: property.numberofbedrooms,
      amenities: property.amenities,
      nearby: property.nearby,
    };

    if ($scope.timer) {
      $interval.cancel($scope.timer);
    }
    startSlideshow(paths);
  };

  return getImgPaths()
    .then(setShowingPic);

};

var startSlideshow = function (paths) {
  var i = 0;
  $scope.currentProperty.showingPic = paths[i];
  $scope.timer = $interval(function () {
    console.log(i);
    i++;
    $scope.currentProperty.showingPic = paths[i];
    if (i == paths.length - 1) {
      i = 0;
    }
  }, 3000);
};


// var slideItems = function () {
//   $timeout(function(){
//     var tileWidth = $(".tile").width();

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

//   }, 1000);
// };



// var defaultSlideOffset = function () {
//   if ($stateParams.id) {
//     var id = $stateParams.id;
//     var index = function () {
//       return $http.get("/static/data/properties.json")
//         .then(function (data) {
//           var items = data.data;
//           var item = items.filter(function (row) {
//             return row.id == id;
//           });
//           console.log(items, item);
//           return items.indexOf(item);
//         });
//     };
//
//     index()
//       .then(function (response) {
//         console.log(response);
//         var width = $(".item").width();
//         var leftPos = $('.carousel').scrollLeft();
//         $(".carousel").animate({scrollLeft: 0}, 300);
//         $(".carousel").animate({scrollLeft: leftPos - (response*width)}, 300);
//       });
//
//   }
// };


var loadPage = function () {
  getLocations()
    .then(setDefaultProperty);
  // slideItems();
  // defaultSlideOffset();

  // var width = $(".carousel").width();
  // var leftPos = $('.carousel').scrollLeft();
  // $(".carousel").animate({scrollLeft: leftPos + width}, 6000);
  // console.log(leftPos);

};
loadPage();



$scope.scrollLeft = function () {
  var width = $(window).width() / 3 + 20;
  var leftPos = $('.carousel').scrollLeft();
  $(".carousel").animate({scrollLeft: leftPos - width}, 300);
};



$scope.scrollRight = function () {
  var width = $(window).width() / 3;
  var leftPos = $('.carousel').scrollLeft();
  $(".carousel").animate({scrollLeft: leftPos + width}, 300);
};


});

})();
