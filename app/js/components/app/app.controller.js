function AppController(DataService) { 
  // save context
  var ctrl = this;
  
  // data binding categories
  ctrl.categories = [];
  // data binding genders
  ctrl.genders = [];
  // data binding ages
  ctrl.ages = [];

  // request eckdaten
  ctrl._getEckdaten = function() {
    // promise holder
    var promArr = [];
    // add promises
    promArr.push(DataService.getCategories());
    promArr.push(DataService.getGenders());
    promArr.push(DataService.getAges());
    // add data to data binding
    Promise.all(promArr)
      .then(function(data) {
        ctrl.categories = data[0].data;
        ctrl.genders = data[1].data;
        ctrl.ages = data[2].data;
      })
      .catch(function(error) {
        console.dir(error);
      });
  }

  // load eckdaten
  ctrl.$onInit = function () {
    ctrl._getEckdaten();
  };
}

angular
  .module("app")
  .controller("AppController", AppController);