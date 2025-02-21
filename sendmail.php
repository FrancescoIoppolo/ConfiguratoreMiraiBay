<?php
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

try {

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'tuoaccount@gmail.com';
    $mail->Password = 'tuapassword'; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mail->Port = 587; 

    // Mittente e destinatario
    $mail->setFrom('tuoaccount@gmail.com', 'Nome Mittente');
    $mail->addAddress('destinatario@email.com', 'Destinatario'); // Cambia con il destinatario

    // Oggetto dell'email
    $mail->Subject = 'Nuova Richiesta da ' . htmlspecialchars($userData['name']);

    // **Costruisci il corpo dell'email con un template HTML**
    $message = '<html><body>';
    $message .= '<h2>Nuova richiesta ricevuta</h2>';
    $message .= '<p><strong>Nome:</strong> ' . htmlspecialchars($userData['name']) . '</p>';
    $message .= '<p><strong>Email:</strong> ' . htmlspecialchars($userData['email']) . '</p>';
    $message .= '<p><strong>Telefono:</strong> ' . htmlspecialchars($userData['telefono']) . '</p>';
    $message .= '<p><strong>Attività:</strong> ' . htmlspecialchars($userData['attivita']) . '</p>';
    $message .= '<p><strong>Sito Web:</strong> ' . htmlspecialchars($userData['sitoWeb']) . '</p>';
    
    $message .= '<h3>Manager Selezionati</h3><ul>';
    foreach ($selectedManagers as $manager) {
        $message .= '<li>' . htmlspecialchars($manager['name']) . '</li>';
    }
    $message .= '</ul>';

    $message .= '<h3>Risposte</h3>';
    foreach ($answers as $managerId => $responses) {
        $message .= '<h4>' . htmlspecialchars($managerId) . '</h4><ul>';
        foreach ($responses as $response) {
            $message .= '<li><strong>' . htmlspecialchars($response['question']) . ':</strong> ' . htmlspecialchars($response['percentage']) . '</li>';
        }
        $message .= '</ul>';
    }

    $message .= '<p><strong>Modalità di lavoro scelta:</strong> ' . htmlspecialchars($selectedWorkMode) . '</p>';
    $message .= '</body></html>';

    // Imposta il contenuto dell'email
    $mail->isHTML(true);
    $mail->Body = $message;

    // Invia l'email
    $mail->send();
    echo json_encode(["status" => "success", "message" => "Email inviata con successo"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Errore nell'invio dell'email: {$mail->ErrorInfo}"]);
}
