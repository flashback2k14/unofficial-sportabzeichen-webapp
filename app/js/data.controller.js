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
  function _getEckdaten() {
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
  _getEckdaten();
}

angular
  .module("app")
  .controller("DataController", DataController);


