angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CatController', function($http, $scope){

  $scope.restaurantName = "";

  var categoriesSelected = [];
  var restWithCate = [];

  $scope.categories = [];
  $scope.restaurantes = [];
  $scope.promociones = [];

  $scope.principal = true;
  $scope.restaurantRand = true;

  // var datos_solicitud = {"id_procesos_duracion" : 'id_procesos_duracion'};

  var solicitud = { 
    tarea : 'restaurantes',
    datos: 'datos_solicitud'
  };

 var direccionDestino = 'http://localhost:8000/restaurantes';
      $http( {
        url: direccionDestino,
        method: "GET",
      } ).success( function ( data ) {
        console.log("sucess");
        console.log( data );
        for (var i = 0; i < data['categorias'].length; i++) {
      $scope.categories.push(data['categorias'][i]);
    }
    for (var i = 0; i < data['restaurantes'].length; i++) {
      $scope.restaurantes.push(data['restaurantes'][i]);
    }
    for (var i = 0; i < data['promociones'].length; i++) {
      $scope.promociones.push(data['promociones'][i]);
    }
      }  );



  // $http.get("http://localhost:8000/restaurantes").success(function(data){
    // for (var i = 0; i < data['categorias'].length; i++) {
    //   $scope.categories.push(data['categorias'][i]);
    // }
    // for (var i = 0; i < data['restaurantes'].length; i++) {
    //   $scope.restaurantes.push(data['restaurantes'][i]);
    // }
    // for (var i = 0; i < data['promociones'].length; i++) {
    //   $scope.promociones.push(data['promociones'][i]);
    // }
  // })
  // .error(function(error){
  //   console.log('Error');
  // });

  $scope.restauranteAleatorio = function(){
    console.log('entra a restauranteAleatorio de controlador');
    var randomIndex =  Math.random() * (categoriesSelected.length);
    randomIndex = parseInt(randomIndex);
    randomCategory = categoriesSelected[randomIndex];
    console.log(randomCategory);

    var solicitud = { 
    // tarea : 'restaurantes',
    tags: randomCategory
  };

 var direccionDestino = 'http://localhost:8000/mostrarRestauranteAleatorio';
      $http( {
        url: direccionDestino,
        method: "GET",
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
        data: solicitud
      } ).success( function ( data ) {
        console.log("sucess");
        console.log( data );
      }  );

    // getRestWtithCate();

    //hacer el ajax a restaurante aleatorio de Laravel

  }

  // function getRestWtithCate(){
  //   console.log("-> getRestWtithCate");

  //   for (var i = 0; i < $scope.restaurantes.length; i++) {
  //     console.log($scope.restaurantes[i]);

  //     if ($scope.restaurantes[i].) {};

  //   };

  // }

  $scope.categoriaClick = function( idCategoria ){

    var isSelectet = categoriesSelected.indexOf( idCategoria );

    if (isSelectet === -1) {
      categoriesSelected.push( idCategoria );
    }else{  
      categoriesSelected.splice(0, 1);
    };

    console.log(categoriesSelected);

  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Pizza', id: 1 },
    { title: 'Bebidas', id: 2 },
    { title: 'Botanas', id: 3 },
    { title: 'Hamburguesa', id: 4 },
    { title: 'Tacos', id: 5 },
    { title: 'Sushi', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
