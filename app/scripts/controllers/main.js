'use strict';

/**
 * @ngdoc function
 * @name housingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the housingApp
 */
angular.module('housingApp')
.controller('MainCtrl', function ($rootScope,$scope, $http, $log) {
	$scope.gym = false;
	$scope.lift = false;
	$scope.swimming_pool = false;
	$scope.parking = false;
	$scope.showMap = false;
	var globalMap = null;
	var markers = [];
	$scope.loadTags = function(query) {
		$log.debug(query);
		$log.debug($scope.keywords);
		return $http.get('http://localhost:8000/keyword-suggestion/?q='+query);
	};

	$scope.onChange = function(){
		$log.debug($scope.chosenPlaceDetails);
	}

	var heatmap;
	$scope.$on('mapInitialized', function(event, map) {
		heatmap = map.heatmapLayers.foo;
		globalMap = map;
	});

	$scope.toggleHeatmap= function(event) {
		heatmap.setMap(heatmap.getMap() ? null : $scope.map);
	};

	$scope.changeGradient = function() {
		var gradient = [
			'rgba(0, 255, 255, 0)',
			'rgba(0, 255, 255, 1)',
			'rgba(0, 191, 255, 1)',
			'rgba(0, 127, 255, 1)',
			'rgba(0, 63, 255, 1)',
			'rgba(0, 0, 255, 1)',
			'rgba(0, 0, 223, 1)',
			'rgba(0, 0, 191, 1)',
			'rgba(0, 0, 159, 1)',
			'rgba(0, 0, 127, 1)',
			'rgba(63, 0, 91, 1)',
			'rgba(127, 0, 63, 1)',
			'rgba(191, 0, 31, 1)',
			'rgba(255, 0, 0, 1)'
		]

		heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
	}

	$scope.changeRadius = function() {
		heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }

    $scope.changeOpacity = function() {
    	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }

    $scope.taxiData = [];
    $scope.getHeatmapData = function(){
    	var keywordList = []
    	for(var x in $scope.keywords){
    		keywordList.push($scope.keywords[x].text)
    	}
    	$log.debug(keywordList);
    	var location = [$scope.chosenPlaceDetails.D, $scope.chosenPlaceDetails.k];
    	$log.debug('location', location);
    	$log.debug('flatSize', $scope.flatSize);
    	$log.debug('propertyType', $scope.propertyType);
    	$log.debug('gym', $scope.gym);
    	$log.debug('lift', $scope.lift);
    	$log.debug('swimming_pool', $scope.swimming_pool);
    	$log.debug('parking', $scope.parking);
    	$http.get('http://localhost:8000/get-heatmap-data?location='+JSON.stringify(location)+'&rooms='+$scope.flatSize+'&property_type='+$scope.propertyType+'&gym='+$scope.gym+'&lift='+$scope.lift+'&swimming_pool='+$scope.swimming_pool+'&parking='+$scope.parking)
    	.success(function(result){
    		var taxiData = [];
    		for(x in result){
    			taxiData.push({location: new google.maps.LatLng( result[x].location[1],result[x].location[0]), weight: result[x].weight});
    		}
    		$log.debug(JSON.stringify(taxiData));
    		$scope.taxiData = taxiData;
    		$rootScope.hm = heatmap;
    		globalMap.panTo($scope.chosenPlaceDetails);
    		heatmap.setData(taxiData);	
    	});
    }

    $scope.getListingmapData = function(){
    	var keywordList = []
    	for(var x in $scope.keywords){
    		keywordList.push($scope.keywords[x].text)
    	}
    	$log.debug(keywordList);
    	var location = [$scope.chosenPlaceDetails.D, $scope.chosenPlaceDetails.k];
    	$log.debug('location', location);
    	$log.debug('flatSize', $scope.flatSize);
    	$log.debug('propertyType', $scope.propertyType);
    	$log.debug('gym', $scope.gym);
    	$log.debug('lift', $scope.lift);
    	$log.debug('swimming_pool', $scope.swimming_pool);
    	$log.debug('parking', $scope.parking);
    	$http.get('http://localhost:8000/get-listing-data?location='+JSON.stringify(location)+'&rooms='+$scope.flatSize+'&property_type='+$scope.propertyType+'&gym='+$scope.gym+'&lift='+$scope.lift+'&swimming_pool='+$scope.swimming_pool+'&parking='+$scope.parking)
    	.success(function(result){
			var infoWindow;
    		for(x in result){
    			infoWindow = new google.maps.InfoWindow({content:"heelo"});
    /*			function showInfoWindow(){
					var marker = this;
					infoWindow.open(globalMap)
				}*/
    			var usermarker = new google.maps.Marker({
    				position: new google.maps.LatLng( result[x].location[1],result[x].location[0]),
    				map: globalMap,
    				// icon:"/media/dark-red-icon.png",
    				animation: google.maps.Animation.DROP,
    				title:result[x].rooms+" BHK, "+result[x].property_type,
    				draggable:false
    			})
    			/*google.maps.event.adListener(usermarker,'click',showInfoWindow);*/
    			usermarker.setMap(globalMap);
    			markers.push(usermarker);
    		}			
    	});
    };



    $scope.reset = function(){
    	$scope.showMap = false;
    	for (var i = 0; i < markers.length ; i++){
    		markers[i].setMap(null);
    	}
    }

    $scope.onClick = function(){
    	$scope.getHeatmapData();
    	$scope.getListingmapData();
    	$scope.showMap = true;
    }
});
