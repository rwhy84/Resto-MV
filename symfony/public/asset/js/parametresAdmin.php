<?php
try {
    $bdd = new PDO('mysql:host=localhost;dbname=ResaParam;charset=utf8', 'root', '');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}

$bdd->exec('INSERT INTO ResaParam(id, date, midi, soir) VALUES(' ', ' ', ' ouvert ', ' ouvert ');

echo ' Les lignes ont bien été créées !';

?>

