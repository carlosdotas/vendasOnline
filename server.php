<?php
if($_GET['json']){
	$_GET['ordem'] = 'produto';
	$_GET['direc'] = 'asc';	
}
include_once('funcoes.php');