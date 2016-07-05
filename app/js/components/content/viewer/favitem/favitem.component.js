var FavitemComponent = {
  templateUrl: "js/components/content/viewer/favitem/favitem.html",
  bindings: {
    item: "="
  }
};

angular
  .module("app")
  .component("favitemComponent", FavitemComponent);