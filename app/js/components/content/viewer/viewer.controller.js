function ViewerController() {
  // save context
  var ctrl = this;
  
  // toggle item to / from fav list
  ctrl.toggleItem = function(selected, item) {
    // add to fav list
    if (selected) {
      ctrl.favlist.unshift(item);
    } else {
      // get index from item
      var index = ctrl.favlist.indexOf(item);
      // remove from fav list
      if (index !== -1) {
        ctrl.favlist.splice(index, 1);
      }
    }
  };

  // remove item from fav list
  ctrl.removeItem = function(item) {
    // get index from item
    var index = ctrl.favlist.indexOf(item);
    // remove from fav list
    if (index !== -1) {
      ctrl.favlist.splice(index, 1);
    }
  };
}

angular
  .module("app")
  .controller("ViewerController", ViewerController);