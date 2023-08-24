<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer (true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('info@cosmes.clinic', "Cosmes-clinic") ;
$mail->addAddress('jump.aroundtheworld@mail.ru');
$mail->Subject = 'Заявка с сайта';

$body = '<h1>Надо скорее звонить!</h1>';

if(trim(!empty ($_POST ['name']))){
$body.='<p><strong>Имя:</strong> '.$_POST ['name'].'</p>';
}   if(trim(!empty ($_POST ['phone']))){
$body.='<p><strong>Телефон:</strong> '.$_POST ['phone'].'</p>';
    }

$mail->Body = $body;
//Отправляем
if (!$mail->send ()) {
    $message = "Ошибка, попробуйте попозже.";
} else {
    $message = "Данные отправлены!";
}

$response = ['message' => $message];

header ("Content-type: application/json");
echo json_encode($response);
?>