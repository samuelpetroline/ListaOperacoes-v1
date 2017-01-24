(function () {

    angular
        .module('App')
        .directive('formOperacao', formOperacao);

    function formOperacao() {
        return {
            link: link,
            restrict: 'EA',
            templateUrl: 'SPA/Components/FormOperacao/form-operacao.html',
            controller: 'FormOperacaoController',
            scope: {

            }
        };

        function link(scope, element, attrs) {

        }
    };


})();