angular
  .module("app", [
    "ngMaterial"
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
      .primaryPalette("teal")
      .accentPalette("pink")
      .dark();
  });