// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
});

app.controller("mainController", function($scope, $ionicPopup, $ionicListDelegate) {
  $scope.showRemoveButton = false;

  $scope.items = [];

  var listaTasks = new getListaTasks();
  var config = new getConfig();

  carregarConfig();

  function carregarConfig() {
    $scope.exibirFinalizadas = config.exibirFinalizadas;
  };

  $scope.getItems = function() {
    return listaTasks.items;
  };

  $scope.salvarExibirFinalizadas = function() {
    config.exibirFinalizadas = $scope.exibirFinalizadas;
    config.save();
  };

  $scope.exibirLinha = function(item) {
    return $scope.exibirFinalizadas || !item.marcada;
  };

  $scope.deveMostrarRemoveButton = function() {
    $scope.showRemoveButton = !$scope.showRemoveButton;
  };

  $scope.onItemDelete = function(item) {
    listaTasks.remove(item);
    listaTasks.save();
  };

  $scope.onItemEdit = function(item) {
    exibirPopup(item);
  };

  $scope.onFinalizarClick = function(item) {
    item.marcada = !item.marcada;
    listaTasks.save();
  };

  $scope.adicionarTask = function() {
      $scope.showRemoveButton = false;
      var item = {}
      exibirPopup(item);
  };

  function exibirPopup(item) {
          $scope.data = {};
          $scope.data.task = item.task;

          $ionicPopup.show({
            template: "<input type='text' ng-model='data.task'>",
            title: "Nova tarefa",
            scope: $scope,
            buttons: [
              {
                text: "Ok",
                onTap: function(e) {
                  item.task = $scope.data.task;
                  return item;
                }
              },
              {text: "Cancel"}
            ]
          }).then(function(res) {
            if (res) {

              listaTasks.add(res);
              listaTasks.save();
              $ionicListDelegate.closeOptionButtons();
            }
          });
  }

});
