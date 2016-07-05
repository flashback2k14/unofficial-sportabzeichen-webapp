function CollectorController(DataService, $mdToast) { 
  // save context
  var ctrl = this;

  // data binding categories
  ctrl.category = "";
  // data binding genders
  ctrl.gender = "";
  // data binding ages
  ctrl.age = "";

  // show toast
  ctrl.showToast = function(messge) {
    $mdToast.showSimple(messge);
  };

  // request data
  ctrl.getData = function() {
    if (!ctrl.category) {
      return;
    }

    DataService.getData(ctrl.category, ctrl.gender, ctrl.age)
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

  // clear all elements
  ctrl.clearAll = function(withoutFav) {
    ctrl.category = "";
    ctrl.gender = "";
    ctrl.age = "";
    ctrl.data = [];
    if (!withoutFav) {
      ctrl.favlist = [];
    }
  };
}

angular
  .module("app")
  .controller("CollectorController", CollectorController);