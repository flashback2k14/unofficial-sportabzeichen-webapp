function DataService($http, $q) {

  var API = "https://unofficial-sportabzeichen-api.herokuapp.com/api/v1";

  function _apiCaller(url) {
    return $http.get(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return $q.reject(error);
      });
  }

  function getGenders() {
    return _apiCaller(API + "/eckdaten/genders");
  }

  function getAges() {
    return _apiCaller(API + "/eckdaten/ages");
  }

  function getCategories() {
    return _apiCaller(API + "/eckdaten/categories");
  }

  function getAllFromCategory(category) {
    return _apiCaller(API + "/" + category);
  }

  return {
    getGenders: getGenders,
    getAges: getAges,
    getCategories: getCategories,
    getAllFromCategory: getAllFromCategory
  };
}

angular
  .module("app")
  .factory("DataService", DataService);