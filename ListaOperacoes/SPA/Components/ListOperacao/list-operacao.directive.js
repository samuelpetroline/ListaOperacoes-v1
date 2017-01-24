(function () {

    angular
        .module('App')
        .directive('listOperacao', listOperacao);

    function listOperacao() {
        return {
            link: link,
            restrict: 'EA',
            templateUrl: 'SPA/Components/ListOperacao/list-operacao.html',
            controller: 'ListOperacaoController',
            scope: {

            }
        };

        function link(scope, element, attrs) {

        }
    };


})();