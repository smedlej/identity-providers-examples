# Utilisation de l'application "Fournisseur d'Identité" (FI)

L'application FI est une application servant d'Identity Provider, elle permet de renvoyer des informations à un client OpenID Connect en se basant sur les informations des comptes auxquels on lui donne accès

# Pré-requis
Cette appliquation requiert NodeJS et MongoDB pour fonctionner.

# Installation / démarrage
Pour l'installation, il faut clôner le dépot depuis github.

Une fois cela fait, se rendre dans le répertoire de l'application et installer les dépendances :

    user@machine $ : cd <endroit ou a été clôné le dépot>
    user@machine $ : npm install

si npm s'exécute sans erreurs, il est possible de lancer l'application :

    user@machine $ : npm start

Il est possible de préciser le port sur lequel on souhaite que l'application écoute, le plus simple est de le faire par la ligne de commande :

    user@machine $ : PORT=4243 npm start

# Comment utiliser cette application ?

Il est possible d'utiliser l'application telle quelle avec une base de données mongodb.
Il est aussi possible de se servir de l'application comme d'un proxy qui exploite un annuaire déjà existant. Dans ce cas, pour faire ses vérifications vis à vis de l'annuaire en place, il faut modifier le fichier _helpers/userValidator.js_

Si vous souhaitez modifier l'apparence de la mire d'authentification, il faut mettre en place la mire souhaitée en mettant à jour le template qui se trouve ici : _views/login.ejs_

# Licences
Cette application s'appuie sur le composant [openid-connect-provider](https://www.npmjs.org/package/openid-connect) (License MIT) ainsi que les modules NodeJS [Express](https://www.npmjs.org/package/express), [Lodash](https://www.npmjs.org/package/lodash), [Q](https://www.npmjs.org/package/q), [Sails](https://www.npmjs.org/package/sails) et [Sails-mongo](https://www.npmjs.org/package/sails-mongo).
