/**
 * @license nav-in-list  version: 0.0.1
 * Copyright 2016 Passive Records SARL, http://www.passiverecords.com
 * License: MIT
 *
 * @author      Benjamin Dequevauviller
 * @since       2016-05-01
 */

angular.module('ui.passiverecords', [])
    .directive('navInList', [function() {
        return {
            restrict: 'E',
            scope: {
                start: '=',
                total: '=',
                len: '=',
                lenOptions: '=',
                showPage: '='
            },
            link: function(scope, element, attrs, controllers) {

                // define options length if not provided
                if (scope.lenOptions == undefined || !Array.isArray(scope.lenOptions)) {
                    scope.lenOptions = [5, 10, 20, 50];
                }

                scope.beforenext = function() {
                    var current = Math.ceil((scope.start + scope.len) / scope.len);
                    var max = Math.ceil(scope.total / scope.len);
                    var beforeTab = [];
                    for (var u = 1; u <= 5; u++) {
                        beforeTab.splice(0, 0, {
                            number: (current - u > 0 ? current - u : '&nbsp;'),
                            start: ((current - u - 1) * scope.len),
                            disabled: (current - u > 0 ? false : true)
                        });
                    }
                    var nextTab = [];
                    for (var u = 1; u <= 5; u++) {
                        nextTab.push({
                            number: (current + u <= max ? current + u : '&nbsp;'),
                            start: ((current + u - 1) * scope.len),
                            disabled: (current + u <= max ? false : true)
                        });
                    }

                    scope.BeforePages = beforeTab;
                    scope.NextPages = nextTab;

                };

                scope.$watch("len", function() {
                    scope.start = 0;
                    scope.beforenext();
                });

                scope.$watch("start", function() {
                    scope.beforenext();
                });

                scope.$watch("total", function() {
                    scope.start = 0;
                    scope.beforenext();
                });

            },
            template: '<div class="btn-group"><button class="btn btn-sm btn-success" ng-click="start=0;" ng-disabled="start-len<0;"><i class="fa fa-angle-double-left"></i></button><button class="btn btn-info btn-sm lter" ng-if="showPage" ng-repeat="page in BeforePages" ng-disabled="page.disabled" ng-click="$parent.$parent.start=page.start"><span ng-bind-html="page.number">{{page.number}}</span></button><button class="btn btn-sm btn-success" ng-click="start=start-len;" ng-disabled="start-len<0;"><i class="fa fa-angle-left"></i></button><span class="btn btn-sm btn-info dropdown" dropdown><span class="dropdown-toggle" dropdown-toggle>{{(start+len)/len | ceil}}/{{total/len | ceil}}</span><ul class="dropdown-menu dropdown-menu-right" role="menu"><li><a>Select list length</a></li><li ng-repeat="o in lenOptions" ng-click="$parent.len=o;"><a href>{{o}}</a></li></ul></span><button class="btn btn-sm btn-success" ng-click="start=start+len;" ng-disabled="start+len>=total;"><i class="fa fa-angle-right"></i></button><button class="btn btn-info btn-sm lter" ng-if="showPage" ng-repeat="page in NextPages" ng-click="$parent.$parent.start=page.start" ng-disabled="page.disabled"><span ng-bind-html="page.number">{{page.number}}</span></button><button class="btn btn-sm btn-success" ng-click="start=total-len;" ng-disabled="start+len>=total;"><i class="fa fa-angle-double-right"></i></button></div>'
        };
    }]);
