(function () {
    'use strict';

    angular
        .module('App')
        .service('operacaoService', operacaoService);

    operacaoService.$inject = ['$rootScope', 'ApiService', 'UIService'];

    function operacaoService($rootScope, ApiService, UIService) {

        var vm = this;
        vm.operacoes = [];
        vm.operacao = [];
        vm.tipos_negocio = [];
        vm.request;

        this.carregarListaOperacoes = function () {
            ApiService.GetApiCall("Operacoes", "GetListaOperacoes", {}, function (event) {
                if (event.hasErrors == true) {
                    UIService.showError("Erro ao recuperar as listas de operação:" + event.error.data);
                }
                else {
                    angular.copy(event.result.data, vm.operacoes);
                    vm.broadcastListaOperacoes();
                    vm.carregarTiposNegocio();
                }
            })
        };

        this.broadcastListaOperacoes = function () {
            $rootScope.$broadcast('handleBroadcastListaOperacoes');
        };

        this.carregarOperacao = function (op) {
            ApiService.GetApiCall("Operacoes", "GetOperacao", op, function (event) {
                if (event.hasErrors == true) {
                    UIService.showError("Erro ao recuperar a operação:" + event.error.data);
                }
                else {
                    angular.copy(event.result.data, vm.operacao);
                    vm.broadcastOperacao();
                }
            })
        };

        this.broadcastOperacao = function () {
            $rootScope.$broadcast('handleBroadcastOperacao');
        };

        this.adicionarOperacao = function (op) {
            vm.operacoes.push(op);
            vm.broadcastListaOperacoes();
        };

        this.excluirOperacao = function (op) {

            if (op.CodigoOperacao != 0) {
                ApiService.PostApiCall("Operacoes", "ExcluirOperacao", op, function (event) {
                    if (event.hasErrors == true) {
                        UIService.showError("Erro ao excluir a operacao: " + event.error.data);
                    }
                    else {
                        UIService.showSucess("Excluido com sucesso !!!");
                    }
                })
            }
            vm.operacoes.splice(vm.operacoes.indexOf(op), 1);
            vm.broadcastListaOperacoes();
        };

        this.salvarOperacao = function (op) {
            if (op.CodigoOperacao != 0) {
                ApiService.PostApiCall("Operacoes", "AlterarOperacao", op, function (event) {

                    if (event.hasErrors == true) {
                        UIService.showError("Erro ao alterar a operacao: " + event.error.data);
                    }
                    else {
                        UIService.showSucess("Alterado com sucesso !!!");
                        //vm.broadcastListaOperacoes();
                    }
                });
            } else {
                console.log(op);
                ApiService.PostApiCall("Operacoes", "AdicionarOperacao", op, function (event) {
                    if (event.hasErrors == true) {
                        UIService.showError("Erro ao salvar a operacao: " + event.error.data);
                    }
                    else {
                        UIService.showSucess("Inserido com sucesso !!!");
                        vm.broadcastListaOperacoes();
                    }
                })
            }
        };

        this.carregarTiposNegocio = function () {
            ApiService.GetApiCall("TiposNegocio", "GetTiposNegocio", {}, function (event) {
                if (event.hasErrors == true) {
                    UIService.showError("Erro ao carregar os Tipos de Negócio: " + event.error.data);
                }
                else {
                    vm.tipos_negocio = event.result.data;
                    vm.broadcastTiposNegocio();
                }
            });
        };

        this.broadcastTiposNegocio = function () {
            $rootScope.$broadcast('handleBroadcastTiposNegocio');
        };
    }

})();