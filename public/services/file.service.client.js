(function() {
	angular
		.module("FileServiceApp")
		.factory('fileService', fileService);


	function fileService($http) {

		var fileAPI = {
			"uploadFile": uploadFile,
			"listAllFilesForAdmin": listAllFilesForAdmin,
			"listFilesByUserEmail": listFilesByUserEmail,
			"deleteFile": deleteFile,
		};
		return fileAPI;

		function listAllFilesForAdmin() {
			console.log("List all files - client");
			return $http.get("/fileservice/listAllFiles")
				.then(function(response) {
					console.log("response in files")
					console.log(response)
					return response.data;
				});
		}

		function uploadFile(FormData) {
			console.log("FileService - Client")
			console.log(FormData);

			return $http.post("/fileservice/createFile", FormData, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			})
				.then(function(response) {
					return response.data;
				});
		}

		function listFilesByUserEmail(Email) {
			return $http.get("/fileservice/listFilesByUserEmail/" + Email)
				.then(function(response) {
					return response.data;
				});
		}

		function deleteFile(deletefile) {
			return $http.post("/fileservice/deleteFile", deletefile)
				.then(function(response) {
					return response.data;
				});
		}

	}
})();