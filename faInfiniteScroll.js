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
            scope: {todo: '&', when: '=', height: '='},
            controllerAs: 'infinteScroll',
            controller: function($scope) {
                var infiniteScroll = this;
                var Transitionable = $famous['famous/transitions/Transitionable'];
                var Timer = $famous['famous/utilities/Timer'];
            }
        }
    });