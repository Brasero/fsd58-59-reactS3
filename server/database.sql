-- Créer la base de données todolist si elle n'existe pas
CREATE DATABASE IF NOT EXISTS todolist;

-- Utiliser la base de données todolist
USE todolist;

-- Créer la table tasks
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false
);

-- Insérer des tâches exemples
INSERT INTO tasks (title, completed) VALUES ('Acheter des courses pour la semaine', false);
INSERT INTO tasks (title, completed) VALUES ('Préparer la présentation pour la réunion', false);
INSERT INTO tasks (title, completed) VALUES ('Finir de lire le chapitre du livre', false);
INSERT INTO tasks (title, completed) VALUES ('Appeler maman pour lui souhaiter joyeux anniversaire', false);
INSERT INTO tasks (title, completed) VALUES ('Faire un jogging de 30 minutes', true);
INSERT INTO tasks (title, completed) VALUES ('Écrire un article de blog sur le développement web', false);
