(function () {

    angular
        .module('App')
        .service('UIService', UIService)

    UIService.$inject = ['$http', 'notifications']

    function UIService($http, notifications) {
        return {
            setBusy: function (element, hide) {
                if (hide == true) {
                    element.LoadingOverlay("hide");
                } else {
                    element.LoadingOverlay("show", {
                        image: "",
                        fontawesome: "fa fa-spinner fa-spin"
                    });
                }
            },
            showError: function (message) {
                notifications.showError({ message: message });
            },
            showSucess: function (message) {
                notifications.showSucess({ message: message });
            }
        }
    };


})();