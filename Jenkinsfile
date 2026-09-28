pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'muthuanandhh/solar-system-canvas-simulation'
    }

    stages {

        stage('Test AWS Access') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'jenkins-aws-cli',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    bat '''
                        whoami
                        set AWS_DEFAULT_REGION=us-east-1
                        "C:/Program Files/Amazon/AWSCLIV2/aws.exe" sts get-caller-identity
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE%:%BUILD_NUMBER% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat '''
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                        docker push %DOCKER_IMAGE%:%BUILD_NUMBER%
                        docker logout
                    '''
                }
            }
        }

    }
}
