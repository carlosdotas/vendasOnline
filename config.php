<?php
/**
 * DOTAS Sistemas de Gerenciamendo
 *
 * @copyright       DOTAS SISTEMAS
 * @license         Direito de uso
 * @package         Basico(Administrador de Provedor)
 * @since           1.0
 * @version         2.0
*/

//////////////////////////////////////////////////////////
set_time_limit(60);
ini_set('memory_limit', '-1');
date_default_timezone_set("Brazil/East");

//////////////////////////////////////////////////////////
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
error_reporting(E_ERROR | E_PARSE);
ini_set("display_errors", 1);

//////////////////////////////////////////////////////////
session_start();

//Configuracao do banco de dados
$_SESSION['DB_HOST'] 	  = 'localhost';
$_SESSION['DB_LOGIN'] 	  = 'root';
$_SESSION['DB_SENHA'] 	  = 'C@rlosdo15011';
$_SESSION['DB_NAME'] 	  = 'vendas';
$_SESSION['USER_PADRAO']  = 'admin';
$_SESSION['SENHA_PADRAO'] = '1332';


?>