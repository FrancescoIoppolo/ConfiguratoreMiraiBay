Questo è un include del configuratore...

<?php
$url = "https://configurator.miraibay.net/start.php"; // Sostituisci con il tuo URL
$content = file_get_contents($url);
if ($content !== false) {
    echo $content;
} else {
    echo "Errore nel caricamento del file.";
}
?>