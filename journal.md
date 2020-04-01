# Team Flash Project

### Team Members
- Devanshi Trivedi
- Kesha Shah
- Mili Patel
- Reeya Vani

### Project Modules
- User
- Admin
- Cart
- Order

### Architecture Diagram

![Architecture Diagram](https://github.com/nguyensjsu/sp19-281-team-flash/blob/master/architecture_diagram.jpg)

### Description
1. Frontend - User
Technology Stack: React-Redux, Bootstrap, CSS
User module will be used to login into user module of the application and the request will be sent to appropriate  API Gateway.This module is deployed on Heroku.

2. Frontend - Admin
Technology Stack: React-Redux, Bootstrap, CSS
User module will be used to login into Admin module of the application and the request will be sent to appropriate  API Gateway.This module is deployed on Heroku.

3. API Gateway
API Gateway is connected to internal network load balancer.

4. Network Load Balancer
Network Load Balancer is attached to 2 EC2 instance with docker images of our application running on it.

5. Go APIs
Go APIs specific functionalities are deployed on their specific docker instances. User, Admin, Cart and Orders are various functionalities deployed on 4 different docker instances. Replica of Docker instances are built.

6. MongoDB Sharded Clusters
Database is built on MongoDB and performed clustering and sharding on the database.

7. S3 Bucket
Images of the clothes are stored in S3 bucket. Images are uploaded and fetched from S3 bucket to use in the application.
8. CloudFront
As users will be accessing this application from all over the world, time complexity of the application increases if someone is trying to fetch the image from S3 bucket from that part of the country where S3 bucket is not hosted. So, we have used CloudFront to cache the images all over the world.

## AKF Scale Cube

### X-axis Scaling:
- X-axis uses an approach of scaling an solution by running multiple identical copies of the application behind a load balancer.
- It is implemented by cloning our API in multiple EC2 instances and attaching a load balancer to the instances.



### Y-axis Scaling:
- Y-axis allows segmentation of teams and ownership of code and data, organizational scalability is increased. It focuses on separation of dissimilar functionalities.
- It is implemented by dividing all the services independently i.e. hosting user, admin, cart and orders as different services on different AWS account.

### Z-axis Scaling:
- Z-axis follows the approach of segmentation of similar things. It is splitting similar data in different chunks.
- It is implemented by performing sharding of MongoDB database in all the services.

## Overview of Application:

We have deployed our Frontend i.e. User modules and Admin modules on
Heroku.Frontend makes request to API Gateway built in AWS account of
all the 4 members. The API Gateway internally connects to Network Load
Balancer which connects to Docker Instances.All microservices run
independently of each other and developed using GoLang.All the MongoDB
databases are sharded.

## Areas of Contribution

### Devanshi Trivedi
- Web UI of User module
- Go API of user module
- MongoDB Schema Designing of User Module
- MongoDB Sharding of User Database.
- Handling Network Partition in System

### Kesha Shah
- Web UI of Cart module
- Go API of Cart module
- MongoDB Schema Designing of Cart Module
- MongoDB Sharding of Cart Database.
- Deploying Cart module on multiple instances to perform X-axis scaling.

### Mili Patel
- Web UI of Orders module
- Go API of Orders module
- MongoDB Schema Designing of Orders Module
- MongoDB Sharding of Orders Database.
- Working on X-axis of AKF Cube.

### Reeya Vani
- Web UI of Admin module
- Go API of Admin module
- MongoDB Schema Designing of Orders Module
- MongoDB Sharding of Orders Database.
- Deploying front end on Heroku.