(function () {

    angular
        .module('App')
        .service('ApiService', ApiService)

    ApiService.$inject = ['$http']

    function ApiService($http) {
        var result;

        this.GetApiCall = function (controllerName, method, param, callback) {
            console.log();
            result = $http({
                method: 'GET',
                url: '../api/' + controllerName + '/' + method,
                params: param,
                dataType: 'json'
            }).then(
                    function (data, status) {
                        var event = {
                            result: data,
                            hasErrors: false
                        };
                        callback(event);
                    },
                    function (data, status) {
                        var event = {
                            result: "",
                            hasErrors: true,
                            error: data
                        };
                        callback(event);
                    }
                )
        };

        this.PostApiCall = function (controllerName, method, obj, callback) {
            result = $http({
                method: 'POST',
                url: '../api/' + controllerName + '/' + method,
                data: JSON.stringify(obj),
                dataType: 'json'
            }).then(
                    function (data, status) {
                        var event = {
                            result: data,
                            hasErrors: false
                        };
                        callback(event);
                    },
                    function (data, status) {
                        var event = {
                            result: "",
                            hasErrors: true,
                            error: data
                        };
                        callback(event);
                    }
                )
        }

    };


})();