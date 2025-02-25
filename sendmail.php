<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400");
header('Content-Type: text/html; charset=utf-8');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; 

// Ricevi i dati JSON dal client
$data = json_decode(file_get_contents("php://input"), true);

// Controlla se i dati sono validi
if (!$data) {
    die("Errore: nessun dato ricevuto.");
}

// Estrai i dati
$selectedManagers = $data['selectedManagers'];
$answers = $data['answers'];
$selectedWorkMode = $data['selectedWorkMode'];
$userData = $data['userData'];

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    $mail->Host = 'smtp.ionos.it'; 
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@devworks.it';
    $mail->Password = 'NoReply.2024!';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mail->Port = 587; 
    $mail->isSMTP();

    // Mittente e destinatario
    $mail->setFrom('noreply@devworks.it', 'Mirai Bay - Configuratore');
    $mail->addAddress('francesco.ioppolo@gmail.com', 'Francesco Ioppolo'); 

    // Oggetto dell'email
    $mail->Subject = '📩 Nuova Richiesta da ' . htmlspecialchars($userData['name']);

    // Template HTML
    $message = '
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Nuova Richiesta Configuratore</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { background: #fff; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h2 { color: #333; }
            .info { padding: 10px; background: #f9f9f9; border-radius: 5px; margin-bottom: 15px; }
            .info p { margin: 5px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #007BFF; color: white; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>📌 Nuova richiesta ricevuta dal configuratore</h2>
            <div class="info">
                <p><strong>👤 Nome:</strong> ' . htmlspecialchars($userData['name']) . '</p>
                <p><strong>📧 Email:</strong> ' . htmlspecialchars($userData['email']) . '</p>
                <p><strong>📞 Telefono:</strong> ' . htmlspecialchars($userData['telefono']) . '</p>
                <p><strong>🏢 Attività:</strong> ' . htmlspecialchars($userData['attivita']) . '</p>
                <p><strong>🌍 Sito Web:</strong> ' . htmlspecialchars($userData['sitoWeb']) . '</p>
            </div>

            <h3>👥 Manager Selezionati</h3>
            <ul>';
            foreach ($selectedManagers as $manager) {
                $message .= '<li>' . htmlspecialchars($manager['name']) . '</li>';
            }
            $message .= '</ul>';

            $message .= '<h3>📊 Risposte dei Manager</h3>';
            foreach ($answers as $managerId => $responses) {
                $message .= '<h4>📌 ' . htmlspecialchars($managerId) . '</h4>';
                $message .= '<table>';
                $message .= '<tr><th>Domanda</th><th>Punteggio</th></tr>';
                foreach ($responses as $response) {
                    $message .= '<tr>';
                    $message .= '<td>' . htmlspecialchars($response['question']) . '</td>';
                    $message .= '<td>' . htmlspecialchars($response['percentage']) . '</td>';
                    $message .= '</tr>';
                }
                $message .= '</table>';
            }

            $message .= '<h3>⚙️ Modalità di lavoro scelta:</h3>';
            $message .= '<p><strong>' . htmlspecialchars($selectedWorkMode) . '</strong></p>';

            $message .= '<div class="footer">🔹 Email generata automaticamente da Mirai Bay 🔹</div>';
        $message .= '</div>
    </body>
    </html>';

    // Imposta il contenuto dell'email
    $mail->isHTML(true);
    $mail->Body = $message;

    // Invia l'email
    $mail->send();


    // Email ringraziamento utente
    $mailThankYou = new PHPMailer(true);
    $mailThankYou->CharSet = 'UTF-8';
    $mailThankYou->Host = 'smtp.ionos.it'; 
    $mailThankYou->SMTPAuth = true;
    $mailThankYou->Username = 'noreply@devworks.it';
    $mailThankYou->Password = 'NoReply.2024!';
    $mailThankYou->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mailThankYou->Port = 587; 
    $mailThankYou->isSMTP();

    $mailThankYou->setFrom('noreply@devworks.it', 'Mirai Bay');
    $mailThankYou->addAddress($userData['email'], $userData['name']);

    $mailThankYou->Subject = 'Grazie per la tua richiesta!';

    // Template dettagliato email ringraziamento utente
    $thankYouMessage = '<html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background: #fff; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; }
            h2 { color: #333; }
            p { font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>👋 Grazie ' . htmlspecialchars($userData['name']) . '!</h2>
            <p>Abbiamo ricevuto correttamente la tua richiesta e ti contatteremo il prima possibile con ulteriori informazioni.</p>
            <p>Cordiali saluti,<br>Il Team di Mirai Bay</p>
        </div>
    </body>
    </html>';

    $mailThankYou->isHTML(true);
    $mailThankYou->Body = $thankYouMessage;
    $mailThankYou->send();

    
    echo json_encode(["status" => "success", "message" => "Email inviata con successo"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Errore nell'invio dell'email: {$mail->ErrorInfo}"]);
}
?>