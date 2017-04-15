/**
 * Created by LingZhang on 4/9/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("DealAddController", DealAddController);
    function DealAddController(currentUser, spotService, dealService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.spotId = $routeParams["pid"];
        console.log(vm.spotId);
        vm.createDeal = createDeal;
        // vm.getTrustedHtml = getTrustedHtml;
        function init() {
            spotService
                .findSpotByGeoId(vm.spotId)
                .then(function (spot) {
                    if(spot) {
                        console.log(spot);
                        vm.spot = spot;
                    }
                    else{
                        vm.error = "can't find select spot, please try again!"
                    }
                })
        }

        init();

        function createDeal(deal){
            deal["author"] = vm.user._id;
            deal["authorName"] = vm.user.username;
            deal["geoNameId"] = vm.spotId;
            deal["spot"] = vm.spot.title.toLowerCase();
            deal["image"] = vm.spot.thumbnailImg;
            console.log(deal);
            dealService.createDeal(deal)
                .then(function(deal){
                    if(deal){
                        $location.url("/deal/" + deal._id);
                    }else{
                        vm.error = "Posting Failed, Please try again!"
                    }
                })

        }
    }
})();