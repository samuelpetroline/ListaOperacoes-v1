﻿(function () {

	angular
        .module('App')
        .controller('FormOperacaoController', FormOperacao);

	FormOperacao.$inject = ['$scope', 'ApiService', '$rootScope', 'UIService', 'operacaoService'];

	function FormOperacao($scope, ApiService, $rootScope, UIService, operacaoService) {
	    $scope.operacao = [];
	    $scope.tipos_negocio = [];

	    $scope.GetOperacao = function (operacao) {
	        UIService.setBusy($("#loading-overlay-form"));

	        operacaoService.carregarOperacao(operacao);

	        UIService.setBusy($("#loading-overlay-form"), true);
	    };

	    $scope.$on('handleBroadcastOperacao', function () {
	        $scope.tipos_negocio = operacaoService.tipos_negocio;
	        $scope.operacao = operacaoService.operacao;
	    });

	    $scope.$on('handleBroadcastOperacao', function () {
	        $scope.operacao = operacaoService.operacao;
	    });

	    $scope.$on('handleBroadcastTiposNegocio', function () {
	        $scope.tipos_negocio = operacaoService.tipos_negocio;
	    });

	    $scope.salvarOperacao = function () {
	        UIService.setBusy($("#loading-overlay-form"));

	        operacaoService.salvarOperacao($scope.operacao);

	        UIService.setBusy($("#loading-overlay-form"), true);
	    };
	};


})();