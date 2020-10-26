(function() {
	angular
		.module("FileServiceApp")
		.controller("homeController", homeController);

	function homeController(fileService, $scope, $route, $window, $location) {
		var v = this;
		var tokenpayload;
		v.isAdminUser;
		v.data;
		v.deleteFileByUser = deleteFileByUser;
		v.uploadFile = uploadFile;
		v.downloadFile = downloadFile;
		v.logout = logout;

		function initialize() {
			tokenpayload = jwt_decode($location.hash().split('&')[0].replace("id_token=", ''))
			v.isAdminUser = tokenpayload
				&& tokenpayload["cognito:groups"]
				&& tokenpayload["cognito:groups"].filter(groupname => groupname == "Admin").length > 0;
			console.log(tokenpayload)

			v.data = {
				Email: tokenpayload.email,
				FirstName: tokenpayload.given_name,
				LastName: tokenpayload.family_name,
			}

			if (v.isAdminUser) {
				console.log("Is Admin")
				listAllFilesForAdmin()
			}
			else {
				console.log("Is not Admin")
				listFilesByUserEmail(tokenpayload.email)
			}
		}
		initialize();

		function listAllFilesForAdmin() {
			fileService
				.listAllFilesForAdmin()
				.then(function(files) {
					if (files.length === 0) {
						v.message = "No files uploaded!"
					}
					else {
						v.files = files;
					}
				});
		}

		function uploadFile() {
			v.data.Description = $scope.uploadedfiledesc;

			let formData = new FormData();
			var uploadedFile = $scope.ufiles[0];
			formData.append('fileToUpload', uploadedFile)
			formData.append('data', angular.toJson(v.data))

			fileService
				.uploadFile(formData)
				.then(function(response) {
					$route.reload();
				});
		}

		function downloadFile(file) {
			console.log("here - in download controller")
			console.log(file.FileName)
			$window.open("https://d31a3gp0bmwh7p.cloudfront.net/" + file.Email + "_" + file.FileName)
		}

		function deleteFileByUser(deletefile) {
			console.log(deletefile)
			fileService
				.deleteFile(deletefile)
				.then(function(response) {
					console.log("Received response - controller")
					console.log(response);
					$route.reload();
				});
		}

		function listFilesByUserEmail(email) {
			fileService
				.listFilesByUserEmail(email)
				.then(function(files) {
					console.log(files);
					if (files.length === 0) {
						v.message = "No files uploaded!"
					}
					else {
						v.files = files;
						console.log(files);
					}
				});
		}

		function logout() {
			$window.location.href = "https://myclouprojectsupriyameduri.com/";
		}

	}

	angular
		.module("FileServiceApp")
		.directive('uploadFileDir', [function() {
			return {
				link: function(scope, element) {
					element.on('change', function(evt) {
						scope.ufiles = evt.target.files
					});
				}
			}
		}]);
})();