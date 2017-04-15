/**
 * Created by LingZhang on 4/9/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("DealEditController", DealEditController);
    function DealEditController(currentUser, dealService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.dealId = $routeParams["did"];
        vm.updateDeal = updateDeal;
        // vm.getTrustedHtml = getTrustedHtml;
        function init() {
            dealService
                .findDealById(vm.dealId)
                .then(function (deal) {
                    if(deal) {
                        vm.deal = deal;
                        console.log(deal);
                    }
                    else{
                        vm.error = "can't find select stpry, please try again!"
                    }
                })
        }

        init();

        function updateDeal(dealId, deal){
            dealService.updateDeal(dealId,deal)
                .then(function(deal){
                    if(deal){
                        $location.url("/deal/" + vm.dealId);
                    }else{
                        vm.error = "Posting Failed, Please try again!"
                    }
                })

        }
    }
})();