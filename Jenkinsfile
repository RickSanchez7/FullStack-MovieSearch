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
       	stage('Deploy') {
            steps {
                withCredentials([file(credentialsId: 'lightsail-pem', variable: 'PEM_FILE')]) {
                    sh "scp -o StrictHostKeyChecking=no -i ${PEM_FILE} app.tar.gz ubuntu@15.237.53.215:~/movie-search/server/app.tar.gz"
                }
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'Lightsail',
                            usePemFile: true,
                            pemFileVariable: 'PEM_FILE',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'app.tar.gz',
                                    removePrefix: '',
                                    execCommand: '''
                                        tar -xzvf app.tar.gz
                                        pm2 start movie-search
                                    '''
                                )
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            cleanRemote: true
                        )
                    ]
                )
            }
        }
    }
}
