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

  function _getAllFromCategory(category) {
    return _apiCaller(API + "/" + category);
  }

  function _getAllFromCategoryAndGender(category, gender) {
    return _apiCaller(API + "/" + category + "/" + gender);
  }

  function _getAllFromCategoryGenderAndAge(category, gender, age) {
    return _apiCaller(API + "/" + category + "/" + gender + "/" + age);
  }

  function getData(category, gender, age) {
    var count = 0;

    if (category.length > 0) {
      count++;
    }

    if (gender.length > 0) {
      count++;
    }

    if (age.length > 0) {
      count++;
      age = age.split("-")[1];
    }

    switch(count) {
      case 3:
        return _getAllFromCategoryGenderAndAge(category, gender, age);
  
      case 2:
        return _getAllFromCategoryAndGender(category, gender);
  
      case 1:
        return _getAllFromCategory(category);

      default:
        break;
    }
  }

  return {
    getGenders: getGenders,
    getAges: getAges,
    getCategories: getCategories,
    getData: getData
  };
}

angular
  .module("app")
  .factory("DataService", DataService);