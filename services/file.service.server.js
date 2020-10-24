var mySQL = require('mysql');

var pool = mySQL.createPool({
	connectionLimit: 1000,
	host: "database-1.cvtrkrtxn1di.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "Qwerty786"
});

const fileService = require('fs');
const AWS = require('aws-sdk');

const s3Connection = new AWS.S3({
	accessKeyId: "AKIAIENCFMA62UVWDGCA",
	secretAccessKey: "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"
});
const S3BucketName = "cloud-283-bucket-1";

module.exports = function(app) {
	app.get("/fileservice/listAllFiles", listAllFiles);
	app.post("/fileservice/deleteFile", deleteFile);
	app.get("/fileservice/listFilesByUserEmail/:Email", listFilesByUserEmail);
	app.post("/fileservice/createFile", createFile);
}

// to retrieve all files in the system for admin view
function listAllFiles(req, res) {
	pool.getConnection(function(err, connection) {
		if (err) throw err; // not connected!

		connection.query("SELECT * FROM `supriya-project-schema`.FileMetadataTable",
			function(err, result, fields) {
				connection.release();
				if (err) console.log("LIST ERROR " + err);
				else {
					console.log("LIST " + result);
					return res.status(200).json(result);
				}
			});
	});
}

// for users to upload files

function createFile(req, res) {
   
    console.log(req.body.data) 
	let formdata = JSON.parse(req.body.data);

	var currentTime = new Date().toString();
	let s3filename = formdata["Email"] + "_" + req.files.fileToUpload.name;
	const fileData = req.files.fileToUpload;

	// Create file in S3
	const params = {
		Bucket: "cloud-283-bucket-1",
		Key: s3filename,
		Body: req.files.fileToUpload.data,
	}

	var createValues = {
		FirstName: formdata["FirstName"],
		LastName: formdata["LastName"],
		Email: formdata["Email"],
		FileName: req.files.fileToUpload.name,
		Description: formdata["Description"],
		CreationTime: currentTime,
		LastModifiedTime: currentTime,
		S3Name: s3filename,
	}

	var updateValues = {
		Description: formdata["Description"],
		LastModifiedTime: currentTime,
	}

	console.log(createValues);

	s3Connection.upload(params, function(err, data) {
		if (err) {
			console.log("File upload failed, err: ", err);
			return res.status(500).send(`Can not upload the file. ${err}`);
		}

		// Link the file details to RDS by creating new entry
		pool.getConnection(function(err, connection) {
			if (err) throw err; // not connected!
			console.log("Attempting to insert file record into RDS");

			connection.query("INSERT INTO `supriya-project-schema`.FileMetadataTable SET ? ON DUPLICATE KEY UPDATE ?", [createValues, updateValues],
				function(err, result, fields) {
					connection.release();
					if (err) {
						console.log("RDS insert error: " + err);
						return res.status(500).send(`Row insertion into RDS failed with error: ${err}`);
					}

					console.log("Inserted row into RDS successfully");
					return res.status(200).send(`File uploaded successfully`);
				});
		});
	});
}

// for users to update files with the same filename
function updateFile(req, res) {

}

// for users to delete files
function deleteFile(req, res) {
	let email = req.body.Email;
	let filename = req.body.FileName;

	const s3filename = email + "_" + filename;
	console.log(s3filename);

	//delete from S3
	let params = {
		Bucket: S3BucketName,
		Key: s3filename
	}

	s3Connection.deleteObject(params, function(err, data) {
		console.log("Attempting to delete file from s3");
		if (err) {
			console.log("File delete failed, err: ", err);
			return res.status(500).send(`Can not delete the file. ${err}`);
		}

		console.log("Deleted file from s3 successfully");
		//delete from RDS
		pool.getConnection(function(err, connection) {
			if (err) throw err; // not connected!
			console.log("Attempting to delete file record from RDS");
			connection.query("DELETE FROM `supriya-project-schema`.FileMetadataTable WHERE S3Name = '" + s3filename + "'",
				function(err, result, fields) {
					connection.release();
					if (err) {
						console.log("RDS delete error: " + err);
						return res.status(500).send(`Row deletion from RDS failed with error: ${err}`);
					}

					console.log("Deleted row from RDS successfully");
					return res.status(200).send(`File deleted successfully`);
				});
		});
	});
}

// for users to see only their files
function listFilesByUserEmail(req, res) {
	let email = req.params.Email;

	pool.getConnection(function(err, connection) {
		if (err) throw err; // not connected!

		connection.query("SELECT * FROM `supriya-project-schema`.FileMetadataTable where Email = '" + email + "'",
			function(err, result, fields) {
				connection.release();
				if (err) {
					console.log("List error " + err);
					return res.status(500).send(`List file by user email failed with error: ${err}`);
				}
				console.log(result);
				return res.status(200).json(result);
			});
	});
}