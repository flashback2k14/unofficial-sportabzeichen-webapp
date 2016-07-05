function ContentController(DataService, $mdToast) {
  // save context
  var ctrl = this;
  // data binding categories
  ctrl.category = "";
  // data binding genders
  ctrl.gender = "";
  // data binding ages
  ctrl.age = "";
  // data binding leistungstabelle
  ctrl.data = [];
  // data binding favoritenliste
  ctrl.favList = [];

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
}

angular
  .module("app")
  .controller("ContentController", ContentController);