pipeline {
	agent any

	tools {nodejs "node"}
	stages{
		stage("Build"){
			steps{
				sh "npm init -y"
				sh "npm install mongoose"
			}
		}
		stage("Test"){
			sh "pip install -r requirement.txt"
			sh "python main.py"
		}
	}
}

