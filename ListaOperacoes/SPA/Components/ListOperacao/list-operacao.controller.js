(function () {

    angular
        .module('App')
        .controller('ListOperacaoController', ListOperacao);

    ListOperacao.$inject = ['$scope', 'ApiService', '$rootScope', 'UIService', 'operacaoService'];

    function ListOperacao($scope, ApiService, $rootScope, UIService, operacaoService) {
        
        var vm = this;
        vm.isBegin = true;
        vm.selectedItem;
        $scope.operacoes = [];

        $scope.getListOperacao = function () {
            UIService.setBusy($("#loading-overlay-list"));

            operacaoService.carregarListaOperacoes();

            UIService.setBusy($("#loading-overlay-list"), true);
        };

        $scope.getListOperacao();

        $scope.$on('handleBroadcastListaOperacoes', function () {
  
            $scope.operacoes = operacaoService.operacoes;
            vm.selectedItem = vm.isBegin ? $scope.operacoes[0] : $scope.operacoes[$scope.operacoes.length - 1];
            $scope.carregarOperacao(vm.selectedItem);
            vm.isBegin = false;
        });

        $scope.isSelected = function (item) {
            return item === vm.selectedItem;
        };

        $scope.updateSelectedItem = function (item) {
            vm.selectedItem = item;
        };

        $scope.carregarOperacao = function (op) {
            $scope.updateSelectedItem(op);
            operacaoService.carregarOperacao(op);
        };

        $scope.adicionarOperacao = function () {
            var op = {
                CodigoOperacao : 0,
                NomeOperacao : "Nova Operação",
                Preco : 0,
                Quantidade : 0,
                NomeMercadoria : "",
                TipoMercadoria : "",
                TipoNegocio : "Compra"
            }

            UIService.setBusy($("#loading-overlay-list"));

            operacaoService.adicionarOperacao(op);

            UIService.setBusy($("#loading-overlay-list"), true);
        };

        $scope.excluirOperacao = function (op) {
            operacaoService.excluirOperacao(op);
        };
    };


})();