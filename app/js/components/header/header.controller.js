function HeaderController() {
  this.title = "Unofficial Sportabzeichen Webapp";
}

angular
  .module("app")
  .controller("HeaderController", HeaderController);