<?php
if($_GET['json']){
	$_GET['ordem'] = 'produto';
	$_GET['direc'] = 'asc';	
}


include_once('funcoes.php');

if($_POST[cod]){
	unset($_POST[produtos_id]);
	//unset($_POST[preco_compra]);
	//unset($_POST[estoque]);
	print_r(salvar_mysql(produtos,$_POST,$_POST[cod],cod));
}