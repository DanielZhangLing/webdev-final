/**
 * Created by LingZhang on 4/9/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("StoryEditController", StoryEditController);
    function StoryEditController(currentUser, storyService, $routeParams, $location) {
        var vm = this;
        vm.user = currentUser;
        vm.storyId = $routeParams["sid"];
        vm.updateStory = updateStory;
        // vm.getTrustedHtml = getTrustedHtml;
        function init() {
            storyService
                .findStoryById(vm.storyId)
                .then(function (story) {
                    if(story) {
                        vm.story = story;
                    }
                    else{
                        vm.error = "can't find select stpry, please try again!"
                    }
                })
        }

        init();

        function updateStory(storyId, story){
            storyService.updateStory(storyId,story)
                .then(function(story){
                    if(story){
                        $location.url("/story/" + vm.storyId);
                    }else{
                        vm.error = "Posting Failed, Please try again!"
                    }
                })

        }
    }
})();