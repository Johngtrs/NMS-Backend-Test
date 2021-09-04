# Neomanis REST API dev test
Node.js / Express / MySQL / Docker Compose

# Prerequisites
You should download and install the following tools in your system.

* [Docker Community Edition](https://hub.docker.com/search?type=edition&offering=community)

* [Docker Compose](https://docs.docker.com/compose/install/)

You can also install [Docker Desktop](https://docs.docker.com/get-docker/) , which includes both Docker Engine and Docker Compose, instead of separate installations.

# Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Johngtrs/nms-backend-test.git
   ```
2. Run & Install
   ```sh
   # Go to the directory
   cd nms-backend-test/

   # Run containers
   docker compose up
   ```
   Other commands
   ```sh
   # Use detached mode to run in background
   docker compose up -d

   # Stop and remove
   docker compose down

   # Stop containers
   docker compose stop

   # Remove containers
   docker compose rm

   # Remove volume
   docker volume rm your_volume
   ```
3. The server is running at http://localhost:3000/

*Note: MySQL database will be automatically created and populated due to the docker compose MySQL volume linked with the **docker-entrypoint-initdb.d** folder.*

# Postman Collection
If you don't have postman you can get it here https://www.postman.com/downloads/

To test all web services you can import the postman collection. You can find the collection at this root directory [Neomanis_Backend_Test.postman_collection.json](https://github.com/Johngtrs/nms-backend-test/blob/main/Neomanis_Backend_Test.postman_collection.json).

To import the collection in postman you can click on **File** -> **Import** -> **Select the JSON collection file**.

The API-KEY is already set for all web services in the collection settings. If you are not running the project in localhost, you can change the baseUrl env variable and put your IP like this:
![Output sample](postman_change_settings.gif)

# API Routes

* **GET** /v1/movies -> Get all movie list
* **GET** /v1/movies/:id -> Get one movie by ID
* **GET** /v1/movies/top100/:year -> Get the most top 100 rented movies for a specific year
* **GET** /v1/movies/top100 -> Get the most top 100 rented movies for all time
* **GET** /v1/movies/most_rented/:year -> Get the most rented movie for a specific year
* **GET** /v1/movies/most_rented -> Get the most rented movie for all time
* **GET** /v1/movies/best_author -> Get the author of the most rented movies for all time
* **GET** /v1/movies/search/:title -> Get the movie list searching by partial title
* **POST** /v1/movies -> Add a new movie to database
* **PATCH** /v1/movies/increment_rented -> Increase the rented counter for a specific film and year
