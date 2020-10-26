 # Cloud Project 1 - File Service App

  ## CMPE-281 Cloud Technologies 
 #### Supriya Meduri (015262767)

#### Introduction:

The File Service App is a web application that allows registered users to store files on the cloud and to download, update , and delete files. Hosted on the AWS cloud, it is a three-tier web framework. In order to provide a highly accessible, flexible and cost-effective solution, it is designed using different AWS resources.In addition, the program has an admin view that allows the admin user to access all files and to download or remove files.

#### Application Website: https://myclouprojectsupriyameduri.com
#### Demo Link: https://youtu.be/V-iLxDyG8mo

#### Github Link : https://github.com/supriyameduri9/CMPE281-Project1/tree/master 

(Note :  I had configured AWSCodeCommit for version control but I had to switch to github in the last minute, because AWSCodeCommit doesn’t support public repository access and doesn't have an easy way to give access to users)


#### Architecture Diagram:
![Architecture Diagram](https://user-images.githubusercontent.com/71044935/97132938-8941d380-1705-11eb-8434-ce48cad149db.png)

#### S3 Bucket: 
This is used to store and manage the files uploaded by each user.The storage of this bucket will be Standard S3.  Create a S3 bucket in any region and enable versioning,static web hosting properties. Using Cross region replication feature add a new rule to attach a bucket from another region.

#### S3 Amazon Infrequent Access: 
This is a life cycle policy of bucket, using this create a bucket policy to move the bucket objects to standard infrequent access after the first 75 days.

#### Amazon Glacier: 
This is a cloud storage form of S3, we can archive the files using this service. Configure a lifecycle policy to move the objects to Glacier after 365 days.

#### S3 Transfer Acceleration: 
This service is enabled for fast, easy and secure transfer of files.

#### RDS: 
Launch a MySQl instance and connect to the workbench where user data and corresponding files uploaded will be saved.

#### EC2 Instance: 
Create a EC2 instance , configure the web server to route all the api requests. Create an AMI for the EC2 instance according to the configurations.

#### Auto Scaling Group: 
This service allows to scale the EC2 instances accordingly and makes the application highly scalable.

#### Load Balancer:
This component is configured to distribute the balance between EC2 instances. It routes the traffic to healthy target groups

#### Route 53:
The registered domain name is hosted on route 53 and is resolved by this domain name server

#### Cloud Front: 
Create a cloud front distribution which can be configured for downloading the files 

#### Cognito: 
This service is used to create a user pool which allows user login/signup the application

#### Cloud Watch: 
The Cloud Watch service stores logs from AWS services. I configured cloud watch logs(cloud trail) for S3 as a trigger to AWS lambda function. 

#### Lambda: 
Configured this to invoke SNS and send notification to the subscribed email or phone number when S3 objects are deleted. 
 
#### SNS:
It is the Simple Notification Service for AWS tools that sends email and text messages to the subscribers of the topic created. I added my email address in the subscriptions. 

#### Tech Stack & Tools :
Node Js
Express
Angular Js
AWS RDS
My SQL WorkBench


#### Application Screenshots:

#### Home Page of the application
<img width="1440" alt="HomePage" src="https://user-images.githubusercontent.com/71044935/97130613-23524d80-16ff-11eb-8f43-2f7848c7dae7.png">

#### Sign up of user:
<img width="1440" alt="SignUp" src="https://user-images.githubusercontent.com/71044935/97130748-7deba980-16ff-11eb-95aa-179ef6de4230.png">

#### Verification of the user:
<img width="1440" alt="Verification" src="https://user-images.githubusercontent.com/71044935/97130772-8e9c1f80-16ff-11eb-84cc-98a84eb7e24b.png">

#### Upload a file:
<img width="1440" alt="Upload" src="https://user-images.githubusercontent.com/71044935/97130792-9d82d200-16ff-11eb-9a56-7c8a47b76e5c.png">

#### File Upload success:
<img width="1440" alt="UploadSuccess" src="https://user-images.githubusercontent.com/71044935/97130813-b12e3880-16ff-11eb-8129-4deaa0529db0.png">

#### Download a file:
<img width="1440" alt="Download" src="https://user-images.githubusercontent.com/71044935/97130831-bbe8cd80-16ff-11eb-83b3-e48abe17a882.png">

#### Update a file:
<img width="1440" alt="Update" src="https://user-images.githubusercontent.com/71044935/97130846-c99e5300-16ff-11eb-9843-44e1c8069882.png">

#### Delete a file :
<img width="1440" alt="Delete" src="https://user-images.githubusercontent.com/71044935/97131027-4e896c80-1700-11eb-88ae-e061e0a6608b.png">

#### Delete Success:
<img width="1440" alt="DeleteSuccess" src="https://user-images.githubusercontent.com/71044935/97130895-e9ce1200-16ff-11eb-87a4-e840ac738674.png"

#### Admin View:
<img width="1440" alt="AdminView" src="https://user-images.githubusercontent.com/71044935/97130911-f5213d80-16ff-11eb-874c-79a2248222e8.png">










