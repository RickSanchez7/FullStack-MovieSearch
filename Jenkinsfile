pipeline {
    agent any
    stages {
        stage('install') {
            steps {
                sh "npm run install"
            }
        }
        stage('build') {
            steps {
                sh "npm run build"
            }
        }
        stage('deploy') {
            steps {
                sh "ls"
            }
        }
    }
}