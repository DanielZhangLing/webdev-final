/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("DealListController", DealListController);
    function DealListController(dealService, $filter, $location) {
        var vm = this;
        vm.rows = 10;
        vm.search = search;
        vm.showMore = showMore;
        vm.htmlToPlaintext = htmlToPlaintext;
        // vm.findWikiByGeoId = findWikiByGeoId;

        function init() {

            dealService
                .findAllDeals()
                .then(function (deals) {
                    if (deals) {
                        vm.allDeals = deals;
                        vm.deals = vm.allDeals.slice(0, vm.rows);
                    }
                    else {
                        vm.error = "Cannot find deal you want!"
                    }
                })
        }

        init();

        function htmlToPlaintext(text) {
            text = text ? String(text).replace(/<[^>]+>/gm, '') : '';
            text = text.substring(0, 100) + "...";
            return text;
        }

        function search(keyword) {
            vm.deals = $filter('filter')(vm.allDeals, keyword).slice(0, vm.rows);
        }

        function showMore() {
            vm.rows = vm.rows + 10;
            vm.deals = $filter('filter')(vm.allDeals, keyword).slice(0, vm.rows);
        }

    }
})();