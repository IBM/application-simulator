# Application Simulator

## Overview
The Application Simulator, a webMethods integration solution, emulates various applications such as ERP and CRM. Users can input datasets for items like products, customers, purchase orders, sales orders, service requests, and more, using sample data. This information is then accessible via REST APIs, providing Data as a Service. This tool streamlines the development of dynamic demonstrations and proof-of-concepts.

## Deploy

**Pre-requisites**
* Machine with Docker installed
* Access to [webMethods Container Registry](https://containers.webmethods.io/)

### Clone Repository
* Clone [Application Simulator](https://github.com/IBM/application-simulator) Git repository on your host machine where you have got Docker environment setup.
```
git clone https://github.com/IBM/application-simulator.git
```
* Navigate to the directory
```
cd application-simulator
```

### Pull webMethods Microservice Runtime (MSR) image
* Sign in to [webMethods Container Registry](https://containers.webmethods.io/user-profile) to get the 'user name' and 'user token'.
* Run the below command and login to the webMethods Container Registry.
```
docker login -u <user name> -p <user token> sagcr.azurecr.io
```
* Run the below command to pull the webMethods MSR 10.15 image.
```
docker pull sagcr.azurecr.io/webmethods-microservicesruntime:10.15
```

### Build Docker image
```
docker build -t appsim:1.0 .
```

### Run Docker Container with default dataset only
```
docker run -dp 5555:5555 appsim:1.0
```

### Run Docker Container with custom datasets
Application Simulator comes with default dataset. If any additional custom dataset required,

* Create a directory on host machine. Example: /home/{username}/AppSimData.
* Copy the custom datasets to AppSimData directory.
* Mount the directory as a volume to docker container.
```
docker run -d -p 5555:5555 -v /home/{username}/AppSimData:/opt/AppSimData appsim:1.0
```

## Usage
Application Simulator can be accessed at http://{hostname}:5555/AppSim/.

{hostname} is host domain name where container is running.

**Default User**

This user is to access default dataset records, download Postman collection, Swagger, etc.

Username: default_asuser

Password: appsimmanage

**Admin User**

This user is for admin tasks like approve access request, delete datasets, etc.

Username: admin_asuser

Password: appsimadmin

