var HeaderComponent = {
  templateUrl: "js/components/header/header.html",
  controller: "HeaderController"
};

angular
  .module("app")
  .component("headerComponent", HeaderComponent);