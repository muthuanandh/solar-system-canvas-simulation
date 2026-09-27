pipeline {
    agent any

    stages {

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
                bat 'docker build -t solar-system-canvas-simulation:%BUILD_NUMBER% .'
            }
        }

    }
}