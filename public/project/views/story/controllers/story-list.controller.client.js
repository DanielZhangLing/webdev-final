/**
 * Created by LingZhang on 4/7/17.
 */
(function () {
    angular
        .module("ZipStory")
        .controller("StoryListController", StoryListController);
    function StoryListController(storyService, $filter, $location) {
        var vm = this;
        vm.rows = 10;
        vm.search = search;
        vm.showMore = showMore;
        vm.htmlToPlaintext = htmlToPlaintext;
        // vm.findWikiByGeoId = findWikiByGeoId;

        function init() {

            storyService
                .findAllStories()
                .then(function (stories) {
                    if (stories) {
                        vm.allStories = stories;
                        vm.stories = vm.allStories.slice(0, vm.rows);
                    }
                    else {
                        vm.error = "Cannot find story you want!"
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
            vm.stories = $filter('filter')(vm.allStories, keyword).slice(0, vm.rows);
        }

        function showMore() {
            vm.rows = vm.rows + 10;
            vm.stories = $filter('filter')(vm.allStories, keyword).slice(0, vm.rows);
        }

    }
})();