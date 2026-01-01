pipeline {
    agent any
    environment {
        APP_NAME = 'pulse'
        DOCKER_USERNAME = 'moabdelazem'
        COMMIT_SHA = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS = 'docker-credentials'
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:${COMMIT_SHA}"
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
                    sh "docker tag ${DOCKER_IMAGE} ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:latest"
                }
            }
        }

        stage("Push docker image") {
            steps {
                script {
                    echo "Pushing Docker Image: ${DOCKER_IMAGE}"
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login ${DOCKER_REGISTRY} -u $DOCKER_USER --password-stdin'
                        sh "docker push ${DOCKER_IMAGE}"
                        sh "docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:latest"
                    }

                    echo "Successfully pushed Docker Image: ${DOCKER_IMAGE}"
                    echo "Also tagged: ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:latest"
                }
            }
        }

        stage("Cleanup local docker image") {
            steps {
                script {
                    echo "Cleaning up local docker images"
                    sh "docker rmi ${DOCKER_IMAGE}"
                    sh "docker rmi ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${APP_NAME}:latest"
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