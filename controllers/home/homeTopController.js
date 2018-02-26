(function () {

app.controller("homeTopController", function (
  $state, $stateParams, $scope, $http
) {


$scope.header = {};
$scope.properties = [];
$scope.property = {};
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




var loadPage = function () {
  getProperties()
    .then(getPropertyDetails);
};
loadPage();

});

})();
