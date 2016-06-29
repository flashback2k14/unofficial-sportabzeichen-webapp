function DataController(DataService) {
  var ctrl = this;

  ctrl.categories = [];
  ctrl.category = {};

  ctrl.genders = [];
  ctrl.gender = {};

  ctrl.ages = [];
  ctrl.age = {};

  ctrl.status = "";
  ctrl.data = [];

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

  ctrl.getData = function() {
    if (!ctrl.category) {
      return;
    }

    DataService.getAllFromCategory(ctrl.category.kategorie)
      .then(function(response) {
        ctrl.data = [];
        ctrl.status = response.status + " - " + response.message;
        ctrl.data = response.data.map(function(item) {
          return item;
        });
      })
      .catch(function(error) {
        console.dir(error);
      });
  };

  getEckdaten();
}

angular
  .module("app")
  .controller("DataController", DataController);


