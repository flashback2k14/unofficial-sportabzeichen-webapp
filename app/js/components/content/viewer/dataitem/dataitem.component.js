var DataitemComponent = {
  templateUrl: "js/components/content/viewer/dataitem/dataitem.html",
  bindings: {
    item: "=",
    selected: "="
  }
};

angular
  .module("app")
  .component("dataitemComponent", DataitemComponent);