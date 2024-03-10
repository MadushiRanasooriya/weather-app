# Weather App

This is a simple guide to set up and run the React app using Docker.

## Prerequisites

Make sure you have the following installed on your machine:
- Docker

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/madushiranasooriya/weather-app.git
    ```

2. Change into the project directory:

    ```bash
    cd weather-app
    ```

3. Build the Docker image:

    ```bash
    docker build -t <docker_image_name> .
    ```

4. Run the Docker container:

    ```bash
    docker run -p <port_number>:3000 -d <docker_image_name>
    ```

Now, you should be able to access your React app at:
    ```bash
    http://localhost:<port_number>/
    ```

## Additional Information

- If you have another application running on the above port number, you can check the ports of running docker   images from the following code:

    ```bash
    docker ps
    ```

- To stop the running Docker container:

    ```bash
    docker stop <container_id>
    ```

- To remove Docker images:

    ```bash
    docker rmi -f <docker_image_name>
    ```

 - Check created Docker images:

    ```bash
    docker images
    ```   

- For HTTPS support, update the Dockerfile to include SSL configurations.

