/**
 * Created by LingZhang on 3/1/17.
 */
(function () {
    angular
        .module('navTab', [])
        .directive('showTab', showTab);

    function showTab($http, $routeParams) {
        function linkFunction(scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                var href = $(element).attr('href');
                console.log(href);
                href = href.substring(href.lastIndexOf("#"));
                $('.tab-pane').removeClass('active');
                $(href).addClass('active');
            });

        }

        return {
            link: linkFunction
        }
    }

})();