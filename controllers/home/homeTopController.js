(function () {

app.controller("homeTopController", function (
  $state, $stateParams, $scope, $http
) {


$scope.header = {};
$scope.properties = [];
$scope.currentProperty = {};
var propertyId = '';
if ($stateParams.id) {
  var propertyId = $stateParams.id;
}

var getProperties = function () {
  return $http.get("/static/data/properties.json")
    .then(function (data) {
      $scope.properties = data.data;
    });
};


var getCurrentProperty = function () {
  var id = $stateParams.id;
  return $http.get("/static/data/properties.json")
    .then(function (data) {
      var properties = data.data;
      $scope.currentProperty =  properties.find(function (row) {
        return row.id == id;
      });

      var params = {
        id: $scope.currentProperty.id
      };
      return $http.get("/api/getImageFilePaths", {params})
        .then(function (filePaths) {



          console.log(filePaths);



        });
    });
};



var getPropertyDetails = function (properties) {
  $scope.property = {};
  $scope.property = $scope.properties.find(function (row) {
    return row.id == propertyId;
  });

  $scope.header = {
    title: $scope.property.name,
    description: $scope.property.neighbourhood
  };

  return $scope.property;
};




// var loadPage = function () {
//   getProperties()
//     .then(getPropertyDetails)
//     .then(getCurrentProperty);
// };
// loadPage();

});

})();
