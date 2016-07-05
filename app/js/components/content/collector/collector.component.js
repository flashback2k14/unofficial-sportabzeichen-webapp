var CollectorComponent = {
  templateUrl: "js/components/content/collector/collector.html",
  controller: "CollectorController",
  bindings: {
    categories: "<",
    genders: "<",
    ages: "<",
    data: "=",
    favlist: "="
  }
};

angular
  .module("app")
  .component("collectorComponent", CollectorComponent);