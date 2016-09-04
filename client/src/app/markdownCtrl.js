app.controller('markdownCtrl', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {
		$scope.markdown = '';
		$scope.submit = function() {
			$http.post('/markdown/save', {
				markdown: $scope.markdown
			}).then(function(data) {
				$scope.markdown = '';
				$scope.popMessage("Markdown Created", 0);
				$scope.getAll();
			}).catch(function(error) {
				$scope.popMessage("Oops something went wrong !!", 1);
			})
		}

		$scope.getAll = function() {
			$http.get('/markdown/get').then(function(response) {
				$scope.markdowns = response.data;
			}).catch(function(error) {
				$scope.popMessage("Oops something went wrong !!", 1);
			})
		}

		$scope.get = function() {
			if ($routeParams.id)
				$http.get('/markdown/get/' + $routeParams.id).then(function(response) {
					$scope.markdown = response.data;
				}).catch(function(error) {
					$scope.popMessage("Oops something went wrong !!", 1);
				})
		}

		$scope.popMessage = function(msg, messageType) {
			$scope.alert = {
				message: msg,
				messageType: messageType //0 for info and 1 for error
			};
		}
	}
])