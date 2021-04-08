<?php
if($_GET['json']){
	$_GET['ordem'] = 'produto';
	$_GET['direc'] = 'asc';	
}
if($_POST[cod]){
	unset($_POST[produtos_id]);
}

include_once('funcoes.php');