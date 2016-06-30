function DataController(DataService, $mdToast) {
  // save context
  var ctrl = this;
  // data binding categories
  ctrl.categories = [];
  ctrl.category = "";
  // data binding genders
  ctrl.genders = [];
  ctrl.gender = "";
  // data binding ages
  ctrl.ages = [];
  ctrl.age = "";
  // data binding leistungstabelle
  ctrl.data = [];

  // show toast
  ctrl.showToast = function(messge) {
    $mdToast.showSimple(messge);
  };

  // request eckdaten
  function getEckdaten() {
    DataService.getCategories()
      .then(function(response) {
        ctrl.categories = response.data.map(function(item) {
          return item;
        });
      })
      .catch(function(error) {
        console.dir(error);
      });

    DataService.getGenders()
      .then(function(response) {
        ctrl.genders = response.data.map(function(item) {
          return item;
        });
      })
      .catch(function(error) {
        console.dir(error);
      });

    DataService.getAges()
      .then(function(response) {
        ctrl.ages = response.data.map(function(item) {
          return item;
        });
      })
      .catch(function(error) {
        console.dir(error);
      });
  }

  // request data
  ctrl.getData = function() {
    if (!ctrl.category) {
      return;
    }

    DataService.getAllFromCategory(ctrl.category)
      .then(function(response) {
        ctrl.data = [];
        ctrl.data = response.data.map(function(item) {
          return item;
        });
        ctrl.showToast(response.status + " - " + response.message);
      })
      .catch(function(error) {
        console.dir(error);
      });
  };

  // load eckdaten
  getEckdaten();
}

angular
  .module("app")
  .controller("DataController", DataController);


