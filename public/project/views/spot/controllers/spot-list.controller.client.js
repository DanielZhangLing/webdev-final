/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("SpotListController", SpotListController);
    function SpotListController($routeParams,spotService, $location, currentUser) {
        var vm = this;
        vm.user = currentUser;
        vm.rows = 10;
        vm.headKeyword =$routeParams['headKeyword'];
        vm.search = search;
        vm.showMore = showMore;
        vm.createSpot = createSpot;
        // vm.findWikiByGeoId = findWikiByGeoId;

        function init() {
            if(vm.headKeyword){
                vm.search(vm.headKeyword);
            }
            else if (vm.user) {
                vm.search(vm.user.state);
            } else {
                vm.search('Boston');
            }
        }

        init();

        function createSpot(spot) {
            spotService
                .findWikiByGeoId(spot.geoNameId)
                .then(function (wiki) {
                    if (wiki) {
                        spot["content"] = wiki.extract;
                        return spot;
                    }
                    else {
                        console.log("can't find wiki!");
                        return null;
                    }
                })
                .then(function (spot) {
                    spotService.createSpot(spot)
                        .then(function (spot) {
                            if (spot) {
                                $location.url("/spot/" + spot.geoNameId);
                            }
                            else {
                                vm.error = "Cannot find spot you want!"
                            }
                        })
                })


        }

        function search(keyword) {
            vm.keyword = keyword;
            spotService
                .searchSpotByKeyword(keyword, vm.rows)
                .then(function (data) {
                    if (data && data.geonames.length > 0) {
                        vm.spots = data.geonames;
                    }
                    else {
                        vm.error = "Please check your keyword and try again!"
                    }
                })
        }

        function showMore() {
            vm.rows = vm.rows + 10;
            search(vm.keyword);
        }

    }
})();