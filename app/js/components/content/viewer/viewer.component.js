var ViewerComponent = {
  templateUrl: "js/components/content/viewer/viewer.html",
  controller: "ViewerController",
  bindings: {
    data: "=",
    favlist: "="
  }
};

angular
  .module("app")
  .component("viewerComponent", ViewerComponent);