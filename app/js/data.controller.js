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
  // data binding favoritenliste
  ctrl.favList = [];

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
      ctrl.favList = [];
    }
  };

  // toggle item to / from fav list
  ctrl.toggleItem = function(selected, item) {
    // add to fav list
    if (selected) {
      ctrl.favList.unshift(item);
    } else {
      // get index from item
      var index = ctrl.favList.indexOf(item);
      // remove from fav list
      if (index !== -1) {
        ctrl.favList.splice(index, 1);
      }
    }
  };

  // remove item from fav list
  ctrl.removeItem = function(item) {
    // get index from item
    var index = ctrl.favList.indexOf(item);
    // remove from fav list
    if (index !== -1) {
      ctrl.favList.splice(index, 1);
    }
  };

  // load eckdaten
  getEckdaten();
}

angular
  .module("app")
  .controller("DataController", DataController);


