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
                        credentialsId: 'dockerhub-solar-jenkins-v2',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    powershell '''
                        $env:DOCKER_PASSWORD | docker login -u $env:DOCKER_USERNAME --password-stdin

                        if ($LASTEXITCODE -ne 0) {
                            exit 1
                        }

                        docker push "$env:DOCKER_IMAGE`:$env:BUILD_NUMBER"

                        if ($LASTEXITCODE -ne 0) {
                            exit 1
                        }

                        docker logout
                    '''
                }
            }
        }

    }
}