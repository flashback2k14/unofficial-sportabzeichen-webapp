function ContentController() {
  // save context
  var ctrl = this;
  
  // data binding leistungstabelle
  ctrl.data = [];
  // data binding favoritenliste
  ctrl.favlist = [];

}

angular
  .module("app")
  .controller("ContentController", ContentController);