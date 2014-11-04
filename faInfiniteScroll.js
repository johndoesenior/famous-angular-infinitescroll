'use strict';

/**
 * Authored By Tal Gleichger
 * http://www.Gleichger.com/
 * tal@gleichger.com
 *
 * November 1st 2014
 */

angular.module('faInfiniteScroll',[
    'famous.angular'])
    .directive('faInfiniteScroll', function($famous) {
        return {
            restrict: 'EA',
            template: '',
            scope: {cb: '&', when: '=', height: '=', length: '@', handler: '='},
            controllerAs: 'infinteScroll',
            controller: function($scope) {
                var infiniteScroll = this;
                var Timer = $famous['famous/utilities/Timer'];

                var totalHeight = 0;
                var when = $scope.when.replace('%','') / 100; // calculate percentage
                var oldLength = 0;
                var currentLength = _.clone($scope.length);

                infiniteScroll.inProgress = false;
                infiniteScroll.page = 0; // will be used later for calculations

                /**
                 * Caching the render node
                 * @Author: Avi Haiat
                 * @param cacheEl
                 * @param findSelector
                 * @returns {*}
                 */
                var getRenderNode = function(cacheEl, findSelector) {
                    if(!angular.isDefined(cacheEl)) {
                        var el = $famous.find(findSelector)[0];
                        if(el) {
                            cacheEl = el.renderNode;
                        }
                    }
                    return cacheEl;
                };

                /**
                 * Get the scroll view position
                 * @returns float
                 */
                var getScrollView = function() {
                    infiniteScroll.scrollview = getRenderNode(infiniteScroll.scrollview, '#scrollView');
                    return infiniteScroll.scrollview;
                };

                /**
                 * On mouse wheel (@BUG: Should be 'update')
                 * See: https://github.com/Famous/famous/issues/437
                 *
                 * Calculate position and trigger 'cb' callback when needed
                 */
                var currentLocation;
                $scope.handler.on("wheel",function(){
                    if(getScrollView() && angular.isDefined(getScrollView().getAbsolutePosition())){
                        totalHeight = $scope.height * $scope.length;
                        infiniteScroll.when = -((totalHeight * when) - totalHeight);
                        if(getScrollView().getAbsolutePosition() >= infiniteScroll.when && !infiniteScroll.inProgress && oldLength != currentLength) {
                            infiniteScroll.page++;
                            infiniteScroll.inProgress = true;
                            currentLocation = (getScrollView().getAbsolutePosition());

                            // WOOHOO
                            $scope.$apply(function(){
                                $scope.cb();
                            });
                            getScrollView().setPosition(currentLocation);
                        }
                    }
                });

                $scope.$on("infiniteScroll.done", function(){
                    oldLength = _.clone(currentLength);
                    currentLength = _.clone($scope.length);

                    // Fix bug length is not set properly
                    setTimeout(function(){
                        currentLength = _.clone($scope.length);
                    },10);

                    infiniteScroll.inProgress = false;
                });
            }
        }
    });