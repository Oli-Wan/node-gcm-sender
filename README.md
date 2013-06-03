Description
===========

Serveur NodeJS qui écoute les messages venant du serveur backend (https://github.com/Oli-Wan/backend) et qui crée un message Google Cloud Messaging à partir de celui-ci. Pour utiliser ce serveur, il faut remplacer les valeurs suivantes dans le fichier server.js :

backend => URL de votre serveur backend

ui => URL de votre serveur mobile-angular

new gcm.Sender => Access Key de votre Google API

regristrationsID => Array de registration ID des clients qui se sont enregistrés auprès de GCM

Ce projet s'appuie sur node-gcm.
