/**
 * Created by LingZhang on 3/1/17.
 */
(function () {
    angular
        .module('navTab', [])
        .directive('showTab', showTab)
        .directive('showAccordion', showAccordion);

    function showTab($http, $routeParams) {
        function linkFunction(scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                var href = $(element).attr('href');
                console.log(href);
                href = href.substring(href.lastIndexOf("#"));
                $('.tab-pane').removeClass('active');
                $('.div[role="tabpanel"]').removeClass('show');
                $(href).addClass('active');
                $(href).addClass('show');
            });

        }

        return {
            link: linkFunction
        }
    }

    function showAccordion($http, $routeParams) {
        function linkFunction(scope, element, attrs) {
            element.click(function (e) {
                e.preventDefault();
                var href = $(element).attr('href');
                console.log(href);
                href = href.substring(href.lastIndexOf("#"));
                $('[role="tabpanel"]').removeClass('show');
                $(href).addClass('show');
            });

        }

        return {
            link: linkFunction
        }
    }

})();