var ContentComponent = {
  templateUrl: "js/components/content/content.html",
  controller: "ContentController",
  bindings: {
    categories: "=",
    genders: "=",
    ages: "="
  }
};

angular
  .module("app")
  .component("contentComponent", ContentComponent);