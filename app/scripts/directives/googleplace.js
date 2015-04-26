// var myApp = angular.module('housingApp', []);
 
angular.module('housingApp').directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            
 
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                // console.log(scope.gPlace.getPlace().geometry.location);
                scope.chosenPlaceDetails = scope.gPlace.getPlace().geometry.location;
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});
