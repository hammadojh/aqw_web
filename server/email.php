<?php
// the message
$msg = $_GET["msg"]

echo $msg

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("omar@aqwas.sa","My subject",$msg);
?>