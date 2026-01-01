pipeline {
    agent any
    environment {
        APP_NAME='pulse'
        COMMIT_SHA=sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        DOCKER_REGISTRY='docker.io'
        DOCKER_CREDENTIALS='docker-credentials'
        DOCKER_IMAGE="${DOCKER_REGISTRY}/${APP_NAME}:${COMMIT_SHA}"
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

        stage("Build the docker image") {
            steps {
                script {
                    echo "Building Docker Image: ${DOCKER_IMAGE}"
                    dockerImage = docker.build(
                        "${DOCKER_IMAGE}",
                        "./app"
                    )
                    sh 'docker tag ${DOCKER_IMAGE} ${DOCKER_REGISTRY}/${APP_NAME}:latest'
                }
            }
        }

        stage("Cleanup local docker image") {
            steps {
                script {
                    echo "Cleaning up local docker image: ${DOCKER_IMAGE}"
                    sh 'docker rmi ${DOCKER_IMAGE}'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}