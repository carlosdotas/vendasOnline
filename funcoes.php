<?php
/*
* Dotas Sistemas 
* Carlos Henrique Silva Dotas < carlosdotas@gmail.com >
* fone: 62 996157340
* http://www.dotas.com.br/
*/
include_once('config.php');

//////////////////////////////////////////////////
function conectarMysql(){
  # PHP 7
  $conexao = mysqli_connect($_SESSION[DB_HOST],$_SESSION[DB_LOGIN],$_SESSION[DB_SENHA]);
  
  if(!mysqli_select_db($conexao , $_SESSION[DB_NAME])){
      mysqli_query($conexao,"CREATE DATABASE ".$_SESSION[DB_NAME]);
      mysqli_select_db($conexao,$_SESSION[DB_NAME],$conexao);
      die;
  }

  $banco = mysqli_select_db($conexao,$_SESSION[DB_NAME]);
  mysqli_set_charset($conexao,'utf8');
  return $conexao;
}

//Salvamento Inteligente
function salvar_mysql($tabela,$dados,$id="",$campo=""){
  
  //Cria campo caso nao exista
  $colunas = lista_colunas($tabela);

  //Clia tabela caso nao exista
  if(!$colunas){
    mysqli_query(conectarMysql(),'CREATE TABLE '.$tabela.' ( '.$tabela.'_id INT( 15 ) NOT NULL AUTO_INCREMENT PRIMARY KEY ) ENGINE = MyISAM;');
    $colunas = lista_colunas($tabela);
  }

  //Clia colunas caso nao exista

  foreach($dados as $k => $v) {

    $colunas = array();

    //$dados[$k] = strtoupper ($v);
    //Configura tipos de form
    $type  = explode('|', $k);
    //$moeda = explode(' ', $v);
    //if($moeda[0]=='R$'){$dados[$k] = $moeda[1];}


    if($type[1]){
      unset($dados[$k]);
      $dados[$type[0]] = $v;
    }

    $k = $type[0];

    //cONVERSOR DE DATAS PARA mkTIME
    unset($coment);
    if($type[1]==data or $type[1]==date){
      $type[1]='INT(20)';
      $coment = 'date';
      $data = explode('/',$v);

      if($data[2]){
        $dados[$k] = mktime(0, 0, 0, $data[1], $data[0], $data[2]);
      }
      unset($data);
      $data = explode('-',$v);
      if($data[2]){
         $dados[$k] = mktime(0, 0, 0, $data[1], $data[2], $data[0]);
      }
    }

    if(!$type[1])$type[1]='TEXT';

    if(!array_search($k, $colunas)){
      mysqli_query(conectarMysql(),'ALTER TABLE `'.$tabela.'` ADD `'.$k."` ".$type[1]." NOT NULL COMMENT '".$coment."' ");      
    };
  }



  //Verifica Existencia de valor
  if($id){
    $id_db = buscar_mysql($tabela, $id, $campo);
  }

  //Grava Resutados
  if($id_db){
     altera_mysql($tabela,$campo,$id,$dados);
     $id_db = buscar_mysql($tabela, $id, $campo);
     $result[id] = $_POST[$tabela.'_id'];
     $result[dados] = $id_db;
     $result[tipo] = a;
  }else{
     $result[id]    = inserir_mysql($tabela,$dados);
     $result[dados] = buscar_mysql($tabela, $result[id]);
     $result[tipo] = s;
  }

  //Grava logs no sistema
  if($tabela!=logs_users){
    $result[tabela]  = $tabela;
    $result[entrada] = json_encode($dados);
    if($id_db)$result[anterior] = json_encode($id_db);
   // salvar_mysql(logs_users,$result);
  } 
  return $result;
}



function listar_tabelas(){

  $result = mysqli_query("show tables"); 
  while($table = mysqli_fetch_array($result)) { 
      $array[] = $table[0];   
  }
  return $array;
}

//Verifica colunas
function lista_colunas($tabela){
  $result = mysqli_query(conectarMysql(),'SHOW full COLUMNS FROM '.$tabela);

  if($result){
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $colunas[] = $row;
      }
    }
  }

  return $colunas;
}



//insere dados em Tabela
function inserir_mysql($tabela,$array){
    
    $conect = conectarMysql();
    mysqli_query($conect,"INSERT INTO $tabela (".implode(',',array_keys($array)).") VALUES ( '".implode("','",$array)."' );");
    $saida = mysqli_insert_id($conect);     
    return $saida;
    
}

//Exclui dados em Tabela
function exclui_mysql($tabela,$id){
  
 //$log[mktime] = mktime();  
 //$log[uid]    = $_SESSION[uid];
 //$log[tipo]   = 'd';
 //$log[id]     = $id;
 // $log[tabela] = $tabela;  
 // $id_db = buscar_mysql($tabela, $id, $tabela.'_id');
 // $log[anterior] = json_encode($id_db);
 // salvar_mysql(logs_users,$log);
  return mysqli_query(conectarMysql(),"DELETE FROM $tabela WHERE ".$tabela."_id=".$id);

}



function exclui_mysql_tuto($tabela,$coluna,$ref){
  

  return mysqli_query(conectarMysql(),"DELETE FROM $tabela WHERE ".$coluna."=".$ref);

}


//altera dados em Tabela
function altera_mysql($tabela,$coluna, $referencia,$array){
     
     foreach ($array as $k => $v) {
              $itens = $itens.' '.$vergula.' '.$k.' = '."'$v'";
              $vergula=',';}
     mysqli_query(conectarMysql(),"UPDATE $tabela SET $itens WHERE $coluna = '$referencia';");
     $saida = mysqli_insert_id(conectarMysql());  
     return $saida;
}



//Cosulta uma linha no mysql
function buscar_mysql($tabela, $pesquiza='', $campo=''){
  

  if(!$campo){
    $campo = $tabela.'_id';
  }

  if($pesquiza){

    if($pesquiza) $pesquizar = "WHERE $campo LIKE '$pesquiza'";
    $query = mysqli_query(conectarMysql(),"SELECT * FROM $tabela $pesquizar");

      if($query ){
       while($myrow = mysqli_fetch_assoc($query) ){

        foreach ($myrow as $k => $v) {
          

              $linha[$k]=$v;
        }

      }}

      if($linha){
        foreach ($linha as $key => $value) {
          if($value)$saida[$key] = $value;
        }
      }


      return $saida;
    }

  }
 


//////Gera venda caso não exista
function gerador_mysql($tabela, $id=0){
  $venda = buscar_mysql($tabela,$id,$tabela.'_id');

  if(!$venda){

    unset($venda);
    $saida[$tabela.'_id']       = $id;
    $saida[$tabela.'_view']     = n;
    $saida[$tabela.'_status']   = 'Novo';
    $saida[$tabela.'_mktime_ini'] = mktime();
    $saida[$tabela.'_data']     = date('d/m/Y H:i:s');

    $saida = salvar_mysql($tabela,$saida,$id,$tabela.'_id');
    $venda = $saida[dados];
    
  }

  return $venda;
}






//Consulta Varias linhas
function consultar_mysql($tabela, $pesquiza=array(), $ordenar='', $orient=''){

  if(isset($pesquiza['rows'])){
      $_POST['rows'] = $pesquiza['rows'];unset($pesquiza['rows']);
  }

  if(isset($pesquiza['filtro'])){

    $filtro  = $pesquiza['filtro'];  unset($pesquiza['filtro']);

  }

  $x = 'WHERE';   

  if ($pesquiza) {
    //Cosulta mysql
    if (is_array($pesquiza)) {
      foreach ($pesquiza as $k => $v) {
        $sep = explode('|', $k);
        $k = $sep[0];

        if ($v) {

          $tipos = "LIKE '%$v%'";
          if ($sep[1]) {
            $tipos = "$sep[1] '$v'";
          }

          $pesquizar .= $x . " $k $tipos ";
          $x = ' AND';

        }
      }
    }

  } else {

    $pesquizar = '';

  }

  //Define Periodo
  if(is_array($periodo)){
    foreach ($periodo as $k2 => $v2) {
      $periodos = $x.' '.$k2." BETWEEN '".$v2[ini]."' and '".$v2[fim]."'";
    }   
  }


  //Paginador
  if($_POST['page']>=1){
    $pagina=($_POST['page']-1)*$_POST['rows'];
  }else{$pagina=0;}
  if($_POST[rows]){$limite = "LIMIT ".$pagina." ,". $_POST[rows];}   //Limite
  
  

  //Cria Relacionamentos
  if (is_array($tabela)){
    foreach ($tabela as $k => $v) {
       $table1 = explode('.',$v[0]);
       $table2 = explode('.',$v[1]);

       $tabela_vinc .= " left join ".$table2[0].' on '.$v[0]." = ".$v[1]   ;
       $tab[] = $table1[0];
    }
    $tabela = array();
    $tabela = $tab[0];
   }
   


  //Organizador
  if($_POST[sort]){
    $ordenar=$_POST[sort];
    $orient=$_POST[order];
  }else{
    
    $query = mysqli_query(conectarMysql(),"SHOW full COLUMNS FROM $tabela");
   
     if($query){
      while ($coluna = mysqli_fetch_assoc($query)) {
         $colunas[] = $coluna["Field"];
         $cols_detalhes[$coluna["Field"]] = $coluna["Comment"];       
      }
    }


    if(!$ordenar){
      $ordenar=$colunas[0];
      $orient=DESC;
    }

  }





  if($orient){$orden = "ORDER BY ".$ordenar." ".$orient;}  //Ordenação


  // efetuando um select na tabela
  $select = mysqli_query(conectarMysql(),"SELECT * FROM $tabela $tabela_vinc $pesquizar ");

  if($select)$cont = mysqli_num_rows($select);

  //Gera Saida
  $query = mysqli_query(conectarMysql(),"SELECT * FROM $tabela $tabela_vinc $pesquizar $periodos $orden $limite");
  if($query)$cont_total = mysqli_num_rows($query);


  //Gera Colunas Separadas  
  if($query){
    while($myrow = mysqli_fetch_assoc($query)){

        //Converte campo de data
        foreach ($myrow as $key => $value3) {
          if($cols_detalhes[$key]=='date'){


            $myrow[$key] = date('d/m/Y',$value3);
          }
        }
        
        $saida[rows][] = $myrow;
      
    }
  }


  if($saida[rows])$saida[total][0] = $cont;
  if(!$saida[rows]){
    $saida[rows] = '';
    $saida[total] = 0;
  }

  

  return $saida;
}







function consultar_mysqli_array($tabela,$chave=''){
  $planos_sql = consultar_mysql($tabela);
  foreach ($planos_sql[rows] as $key => $value) {
    $valor =  $value[$chave];
    if(!$chave)$valor = $value[$tabela.'_nome'];
    $saida[$value[$tabela.'_id']] = $valor;
  }
  return $saida;
}


//Consulta Varias linhas
function consultar_mysqli_filtro($tabela, $pesquiza="", $ordenar='', $orient=''){
    

  //Conecta ao banco de dados


  $x = 'WHERE';  
  if ($pesquiza){ //Cosulta mysql

    if (is_array($pesquiza)){
      foreach ($pesquiza as $k => $v) {
            if($v){
              if(!$tipo){
                $tipos = "LIKE '$v'";
              }else{
                $tipos = "$tipo '$v'";
              }
                $pesquizar .= $x." $k $tipos ";
                $x = ' AND';
          }
      }
    }

  }else{$pesquizar='';}

  if($_POST['q']){

    $q = isset($_POST['q']) ? $_POST['q'] : '';  // the request parameter
    // query database and return JSON result data
    $pesquizar = $x." nome like '%$q%'";

  }

  //Define Periodo
  if(is_array($periodo)){
    foreach ($periodo as $k2 => $v2) {
      $periodos = $x.' '.$k2." BETWEEN '".$v2[ini]."' and '".$v2[fim]."'";
    }   
  }


  //Paginador
  if($_POST['page']>>1){
    $pagina=($_POST['page']-1)*$_POST['rows'];
  }else{$pagina=0;}
  if($_POST[rows]){$limite = "LIMIT ".$pagina." ,". $_POST[rows];}   //Limite
  
  
 //Cria Relacionamentos
  if (is_array($tabela)){
    foreach ($tabela as $k => $v) {
       $table1 = explode('.',$v[0]);
       $table2 = explode('.',$v[1]);

       $tabela_vinc .= " left join ".$table2[0].' on '.$v[0]." = ".$v[1]   ;
       $tab[] = $table1[0];
    }
    $tabela = array();
    $tabela = $tab[0];
   }



  //Organizador
  if($_POST[sort]){
    $ordenar=$_POST[sort];
    $orient=$_POST[order];
  }else{
    
    $query = mysqli_query(conectarMysql(),"SHOW COLUMNS FROM $tabela");
   
    if($query){
      while ($coluna = mysqli_fetch_assoc($query)) {
          $colunas[] = $coluna["Field"];
      }
      $ordenar=$colunas[0];
      $orient=DESC;
    }
  }

  if($orient){$orden = "ORDER BY ".$ordenar." ".$orient;}  //Ordenação


  // efetuando um select na tabela
  $select = mysqli_query(conectarMysql(),"SELECT * FROM $tabela $tabela_vinc $pesquizar ");
  if($select)$cont = mysqli_num_rows($select);

  //Gera Saida
  $query = mysqli_query(conectarMysql(),"SELECT * FROM $tabela $tabela_vinc $pesquizar $periodos $orden $limite");
  //if($query)$cont_total = mysqli_num_rows($query);

   
  if($query){
    while($myrow = mysqli_fetch_assoc($query)){

        $saida[rows][] = $myrow;
      
    }
  }

  if($saida[rows])$saida[total][0] = $cont;
  if(!$saida[rows]){
    $saida[rows] = '';
    $saida[total] = 0;
  }

      

  return $saida;
}




///////////////////////////////////////////////////
function convert_mysql($tabela,$chave,$campo){

  $return = buscar_mysql($tabela,$chave,$tabela.'_id');

  return $return[$campo];
}


function listar_tables($db=DB_NAME){
  
  $sql = "SHOW TABLES FROM ".$db;
  $result = mysqli_query($sql);
  if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
          $tables[] = $row[Tables_in_speed];
      }
  }
  return $tables; 
}


//abrelink
function abrir_url($url, $post='',$cookie='cookie.txt'){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);

        if($post){
          foreach ($post as $key => $value) {
            $postar[] = $key.'='.$value;
          }

          curl_setopt ($ch, CURLOPT_POST, true);
          curl_setopt ($ch, CURLOPT_POSTFIELDS, implode('&', $postar));
        }

        $saida = curl_exec($ch); 
        return $saida;
        }

//Capturador de conteudos
function captura($pagina, $inicio, $fim, $tipo=''){
for ($i = 0; $i <= strlen($pagina); $i++) {
    //Captura divs
    if(substr($pagina, $i, strlen($inicio)) == $inicio){$capturar='s';} //inicia captura
    if(substr($pagina, $i + strlen($inicio), strlen($fim)) == $fim and $capturar=='s' ){  //fim captura
           $capturar='n';
           $unico   = $obj;
           $objeto  .= $obj;
           $objetos[] = $obj;
           $obj = '';}
    if($capturar == 's'){$obj .= substr($pagina, $i+strlen($inicio), 1);} //captura linha
}
if($tipo=="utimo"){return $unico;}
if($tipo=="string"){return $objeto;}
if(!$tipo)    {return $objetos;}

}

function id_hd(){
  $cmd = shell_exec("dir");

  $codigo = explode("\n", $cmd);
  $codigo = explode(" ", $codigo[1]);

  return $codigo[8];
}

//Array Meses
function mes($mes=''){
if(!$mes){$mes=date('n');}

$saida = array(1=>'Janeiro',
               2=>'Fevereiro',
               3=>'Março',
               4=>'Abril',
               5=>'Maio',
               6=>'Junho',
               7=>'Julho',
               8=>'Agosto',
               9=>'Setembro',
               10=>'Outubro',
               11=>'Novembro',
               12=>'Dezembro'
               );
return $saida[$mes];
}


function verificar_email($email){ 
  if(preg_match("/^([[:alnum:]_.-]){3,}@([[:lower:][:digit:]_.-]{3,})(\.[[:lower:]]{2,3})(\.[[:lower:]]{2})?$/", $email)) {
    return true;
  }else{
    return false;
  }
} 


function validaCPF($cpf)
{ // Verifiva se o número digitado contém todos os digitos


    $cpf = str_pad(ereg_replace('[^0-9]', '', $cpf), 11, '0', STR_PAD_LEFT);
  
  // Verifica se nenhuma das sequências abaixo foi digitada, caso seja, retorna falso
    if (strlen($cpf) != 11 || $cpf == '00000000000' || $cpf == '11111111111' || $cpf == '22222222222' || $cpf == '33333333333' || $cpf == '44444444444' || $cpf == '55555555555' || $cpf == '66666666666' || $cpf == '77777777777' || $cpf == '88888888888' || $cpf == '99999999999')
  {
  return false;
    }
  else
  {   // Calcula os números para verificar se o CPF é verdadeiro
        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf{$c} * (($t + 1) - $c);
            }
 
            $d = ((10 * $d) % 11) % 10;
 
            if ($cpf{$c} != $d) {
                return false;
            }
        }
 
        return true;
    }
}


//Converte data mult
function converte_data($data){
    $explode_data = explode('/',$data);
    if($explode_data[2])return mktime(0,0,0,$explode_data[1],$explode_data[0],$explode_data[2]);
    $explode_data2 = explode('-',$data);
    if($explode_data2[2])return $explode_data2[2].'/'.$explode_data2[1].'/'.$explode_data2[0];

    if($explode_data[0]){ return date("d/m/Y", $explode_data[0]); };


}


//Gerador moedas
function moeda($valor=''){
  $saida = 'R$ '.number_format(0, 2, ',', '.') ;
  if($valor){$saida = 'R$ '.number_format($valor, 2, ',', '.'); };
  return $saida;
}

function numero($valor=''){
  $saida = number_format($valor, 2, '.', '');
  return $saida;
}

function real_numero($valor){
  return str_replace(',','.',str_replace('r$','',str_replace('R$','',$valor)));
}


function completa_zero($input,$qnt='8'){
  return str_pad($input, $qnt, 0, STR_PAD_LEFT);
}



function ping($host, $port, $timeout) 
{ 
    $tB = microtime(true); 
    $fP = @fSockOpen($host, $port, $errno, $errstr, $timeout); 
    if (!$fP) { return "down"; } 
    $tA = microtime(true); 
    return round((($tA - $tB) * 1000), 0); 
}

function listar_pastas($pastas){
  $files1 = scandir($pastas);
  unset($files1[0]);unset($files1[1]);

  foreach ($files1 as $key => $value) {
      if(is_file($pastas.'/'.$value)){
        $return[files][] = $value;
      }else{
        $return[dirs][] = $value;
      }
  }
  return $return;
}

function cases($valuer,$array){

  foreach ($array as $key => $value) {
    if($valuer==$key) return $value;
  }

}



function unir_array($array1){

  foreach ($array1 as $key2 => $value2) {
    foreach ($value2 as $key => $value) {
      foreach ($value as $key1 => $value1) {
        $saida[$value[$key2]][$key1] = $value1;
      }
    }
  }

  return $saida;
}

function array_to_sring($array,$sepatator=""){

    if(!$sepatator)$sepatator=',';
    
    foreach ($array as $key => $value) {
        $saida[] = $key."='".$value."'";
    }
    return implode($sepatator, $saida);

}


function get_include($url){
  ob_start();
    include($url);
    $return = ob_get_contents();
  ob_end_clean();
  return $return;
}

function array_tags($array){

  if($array){

    foreach ($array as $key1 => $value1) {

      $tags .= $key1.'="'.$value1.'" ';
    }

  }

  return $tags;
}


function select_mysql($tabela,$coluna,$id='',$name="", $tags=''){
  $dados = consultar_mysql($tabela,'',$coluna,'ASC');
  if ($dados[rows]) {
    $saida .='<option '.$selected.' value="0" > Selecione </option>';
    foreach ($dados[rows] as $key => $value) {
        $selected = '';
        if($value[$tabela.'_id']==$id) $selected = 'selected';
        $saida .='<option '.$selected.' value="'.$value[$tabela.'_id'].'" > '.$value[$coluna].' </option>';
    }
      # code...
  }
  if($name) $coluna = $name;
  return '<select class="input_buscar" name="'.$coluna.'" id="'.$coluna.' '.$tags.'">'.$saida.'</select>';
}
function select($array,$nome='',$id=''){
  if ($array) {
    foreach ($array as $key => $value) {
        $selected = '';
        if($key==$id) $selected = 'selected';
        $saida .='<option '.$selected.' value="'.$key.'" > '.$value.' </option>';
    }
      # code...
  }

  return '<select class="input_buscar" name="'.$nome.'" id="'.$nome.' '.$tags.'">'.$saida.'</select>';
}


//////////////////////////////////////// NOVAS FUNCOES
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////


function createTree(&$list, $parent){
    $tree = array();
    foreach ($parent as $k=>$l){
        if(isset($list[$l['id']])){
            $l['children'] = createTree($list, $list[$l['id']]);
        }
        $tree[] = $l;
    } 
    return $tree;
}


  function Mask($mask,$str){

      $str = str_replace(" ","",$str);

      for($i=0;$i<strlen($str);$i++){
          $mask[strpos($mask,"#")] = $str[$i];

      }

      return $mask;

  }




function sanitizeString($string) {

    // matriz de entrada
    $what = array( 'ä','ã','à','á','â','ê','ë','è','é','ï','ì','í','ö','õ','ò','ó','ô','ü','ù','ú','û','À','Á','É','Í','Ó','Ú','ñ','Ñ','ç','Ç',' ','-','(',')',',',';',':','|','!','"','#','$','%','&','/','=','?','~','^','>','<','ª','º','.' );

    // matriz de saída
    $by   = array( 'a','a','a','a','a','e','e','e','e','i','i','i','o','o','o','o','o','u','u','u','u','A','A','E','I','O','U','n','n','c','C','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_','_' );

    // devolver a string
    return str_replace($what, $by, $string);
}


if($_GET[multbusca]){
  $tabela = $_GET[multbusca];

  $consultar_nome   = consultar_mysql($_GET[multbusca]);

  foreach ($consultar_nome[rows] as $key => $value) {
    foreach ($_GET as $key2 => $value2) {
      if(strpos('::'.strtoupper($value[$key2]), strtoupper($value2) )>=2){
        $saida[$value[$tabela.'_id']] = $value;
      }
    }
  }

  echo json_encode($saida);
  die;
}





////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///





//Sistema de login
//Versão 1.0
//17/01/2017
//////////////Entradas e saidas de dados
//Altenticador do sistema
if($_POST[login] or $_GET[login]){

  //Logoff
  if($_GET[login]==logoff){
    session_destroy();
    salvar_mysql(logs, array(logs_tipo=>login,logs_data_hora=>date('d/m/Y H:i:s'),logs_descricao=>'Log Off efetuado!',logs_user=>$_SESSION[users_id],logs_cat=>'ok'));
    header("Location: .");
    die;
  }

  //Login
  $user = buscar_mysql(users, $_POST[login],user);
  if(($user[senha]==$_POST[senha]) and $user[users_status]=='a'){
    $_SESSION = $user;

    salvar_mysql(logs, array(logs_tipo=>login,logs_data_hora=>date('d/m/Y H:i:s'),logs_descricao=>'Login efetuado com sucesso',logs_user=>$_SESSION[users_id],logs_cat=>'ok'));

    header("Location: .");
  }else{
    salvar_mysql(logs, array(logs_tipo=>login,logs_data_hora=>date('d/m/Y H:i:s'),logs_descricao=>'Erro ao efetuas login, '.$_POST[login] ,logs_cat=>'error'));

  }

}





//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////
//////////////////////////


if($_POST[salvar]==tables_mysql or $_POST[salvar]==tables_mysqli_config){

  $table = $_POST[salvar];unset($_POST[salvar]);unset($_POST[tables_mysqli_id]);unset($_POST[tables_mysqli_config_id]);
  salvar_mysql($table,$_POST,$_POST[table_id],table_id);
  header("Location: ".$_SERVER['PHP_SELF']);
  die;
}

//Busca Dados
if($_GET[link_buscar_mysql]){
  $buscar_mysql = buscar_mysql($_GET[link_buscar_mysql], $_GET[id], $_GET[link_buscar_mysql].'_id');
}


if($_GET[function_exec]){

	eval('echo '.$_GET[function_exec].'("'.implode('","',$_POST).'");');

	die;
}

if($_GET[salvar_mysql]){

  $ref = $_POST[ref];unset($_POST[ref]);
  $campo = $_POST[campo];unset($_POST[campo]);

  $saida = salvar_mysql($_GET[salvar_mysql],$_POST,$ref,$campo);
  echo json_encode($saida);
  die;

}

if($_GET[exclui_mysql]){
	exclui_mysql($_GET[exclui_mysql],$_POST[id]);
	$saida['status']=ok;
	echo json_encode($saida);
	die;
}

if($_GET[buscar_mysql]){
	echo json_encode(buscar_mysql($_GET[buscar_mysql],$_POST[ref],$_POST[campo]));
	die;
}

if($_GET[consultar_mysql]){
  if($_GET[qnt])$_POST[rows]=$_GET[qnt];$_POST['page']=1;
	echo json_encode(consultar_mysql($_GET[consultar_mysql],$_GET[busca],$_GET[orden],$_GET[orient]));
	die;
}

if($_GET[consultar_mysqli_filtro]){
	echo json_encode(consultar_mysqli_filtro($_GET[consultar_mysqli_filtro],$_POST[busca],$_POST[orden],$_POST[orient]));
	die;
}


//Apaga Item
if($_GET[del]){

  exclui_mysql($_GET[del],$_GET[id]);
  die;
  //header('Location: .');
}




//Apaga Item
if($_GET[excluir]){

  exclui_mysql($_GET[excluir],$_GET[id]);
  echo ok;
  die;
  
  //header('Location: .');
}

//Editar
if($_POST[edit]){
  
  print_r($_POST);

  $editar[faturas_id] = $_POST[ref];
  $editar[faturas_status] = 'a';
  $editar[faturas_data_pgtp] = '';
  $editar[faturas_valor_pgto] = '';
  $editar[faturas_desconto] = '';
  $editar[faturas_multa] = '';
  $editar[faturas_juros] = '';

  salvar_mysql(faturas,$editar,$_POST[ref],faturas_id );

  if(!$_GET[table]){  
    include_once(ROOT.'modulos/faturas/automatico.php'); 
  }


  die;
  //header('Location: .');
}


///Salvamento de HTML
if($_POST[salvar]){

	$tabela   = $_POST[salvar];unset($_POST[salvar]);
	$redirect = $_POST[redirect];unset($_POST[redirect]);
	$ajax     = $_POST[ajax];unset($_POST[ajax]);


    if($_FILES){
      foreach ($_FILES as $key => $value) {
        if(!is_dir(ROOT.'uploads/'))mkdir(ROOT."uploads");
      $uploaddir = ROOT.'uploads/';
      $uploadurl = URL.'uploads/';
      $mk = mktime();
      $fileurl   = $uploadurl .$mk.'_'.basename($_FILES[$key]['name']);
      $uploadfile = $uploaddir .$mk.'_'.basename($_FILES[$key]['name']);
      move_uploaded_file($_FILES[$key]['tmp_name'], $uploadfile);
      $_POST[$key] = $fileurl;
      }
    }


  //Salva Select
  foreach ($_POST as $key => $value) {
    if(is_array($value)){

      if($value[key($value)]){
        $item = buscar_mysql($key,$value[key($value)],$key.'_id');
        if(!$item){
          $salvar = salvar_mysql($key,$value);
          unset($_POST[$key]);     
          $_POST[$key] = $salvar[id];
        }else{
          $_POST[$key] = $item[$key.'_id'];
        }
      }else{
        $_POST[$key]='';
      }
    }
  }
  ;
  //Salva Conteudo
  $id_mysql = $salvar_mysql = salvar_mysql($tabela,$_POST,$_POST[$tabela."_id"],$tabela."_id");

  if($ajax == true){
  	echo json_encode($salvar_mysql);
  	die;
  }

}




//////Rega Json
if($_GET[json]){

  $filtro = $_GET[filtro];
  unset($_GET[filtro]);

  $tabela = $_GET[json];
  unset($_GET[json]);
  $direc = $_GET[direc];
  unset($_GET[direc]);

  if($_GET[ordem]){
    $ordem = $_GET[ordem];
    unset($_GET[ordem]);
  }

  //$rows = $_GET[rows];unset($_GET[rows]);
  
  $sepadador = explode('|', $tabela);
      
  if($sepadador[1]){
    unset($tabela);
    foreach ($sepadador as $key => $value) {
      $mesclar = explode('/', $value);
      if($mesclar[1]){      
        $tabela[] = $mesclar; 
      }
    }
  }else{
    $mesclar = explode('/', $tabela);
    if($mesclar[1]){  
      unset($tabela);   
      $tabela[] = $mesclar; 
    }
  }

  if(!$filtro){
      $dados = consultar_mysql($tabela,$_GET,$ordem,$direc);
  }else{
      $dados = consultar_mysqli_filtro($tabela,$_GET,$ordem,$direc);
  }


  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');


  if($rows){
    echo json_encode($dados[rows]);
    die;
  }

  echo json_encode($dados);
  die;
}

if($_GET[limpar_tabela]){

  mysqli_query(conectarMysql(),'DROP TABLE `'.$_GET[limpar_tabela].'`;');
  echo '<script>javascript:history.back()</script>';
  die;
}

if($_GET[delete_col]){
  $del_col = explode('|',$_GET[delete_col]);
  
  mysqli_query('ALTER TABLE `'.$del_col[0].'` DROP `'.$del_col[1].'`;');
}


if($_GET[excel]){

    $dados_excel = consultar_mysql($_GET[excel]);
    foreach ($dados_excel[rows] as $key => $value) {
      $linhas .= implode(';',$value)."\n";
      $titulo = array_keys($value);
    }

    header('Cache-control: private');
    header('Content-Type: application/octet-stream');
    header('Content-Length: '.filesize($local_file));
    header('Content-Disposition: filename='.$_GET[excel].'.csv');
    echo implode(';', $titulo)."\n".$linhas;
    die;
}


  
if($_GET[imagem]){
  ob_clean();

  header("Content-type:image/png");

  $img = ROOT.'/modulos/Cadastros/Produtos/imagens/'.$_GET[imagem].'.jpg';
  if(!is_file( $img )){

      if($_GET[google]=="on"){
        $img_google = json_decode (abrir_url('https://api.qwant.com/api/search/images?count=3&offset=1&tbs=ctr:countryBR&q='.$_GET[imagem].'','','nova.txt'),1);
      }

      if($img_google[data][result][items][0][media_fullsize]){
        file_put_contents($img, abrir_url($img_google[data][result][items][0][media]));        
      }else{
        $img = ROOT.'imgs/no_image.png';
      }
 
  }


  echo file_get_contents($img);
  die;
}



if($_GET[tree]){
  
  $json = dirToArray($dir=ROOT.'/'.$_GET[id]);

  if(!$_GET[id]){
    $tree[0][id]='index';
    $tree[0][text]='Inicio';
    $tree[0][children] = $json ;
    $saida = $tree;
  }else{
    $saida = $json;
  }

  echo json_encode($saida);
  die;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function dirToArray($dir='') { 
   

    $x = 0;
    $cdir = scandir($dir); 
    foreach ($cdir as $key => $value) 
    { 
      if (!in_array($value,array(".",".."))) 
      { 
         if (is_dir($dir . DIRECTORY_SEPARATOR . $value)) 
         { 
            $saida[$x][id]    = $_GET[id].'/'.$value;
            $saida[$x][text]  = $value;
            $saida[$x][state] = 'closed';
            $x++;
         } 
         else 
         { 

            if($value!='info.php'){
              $saida[$x][id]    = $_GET[id].'/'.$value;
              $saida[$x][text]  = $value;
              $saida[$x][state] = 'opend';
              $x++;
            }
         } 
      } 
   } 
   
   return $saida; 
} 




function files_html(){

  echo '<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="'.URL.'css/themes/dotas/easyui.css">
    <link rel="stylesheet" type="text/css" href="'.URL.'css/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="'.URL.'css/icons_new/icons.css">
    <link rel="stylesheet" type="text/css" href="'.URL.'css/icons/icons.css">
    <link rel="stylesheet" type="text/css" href="'.URL.'css/stylo.css?'.mktime().'">

    <script type="text/javascript" src="'.URL.'js/jquery.min.js"></script>
    <script type="text/javascript" src="'.URL.'js/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="'.URL.'js/script.js?'.mktime().'"></script>
    <script type="text/javascript" src="'.URL.'js/locale/easyui-lang-pt_BR.js"></script>

    <script type="text/javascript" src="'.URL.'plugins/jquery.maskMoney.js"></script>
</head>
';

}

function tabela($tabela,$colunas_view){

  $tabela = consultar_mysql($tabela);

  foreach ($tabela[rows] as $key => $value) {
    foreach ($value as $key1 => $value1) {
      
      if(in_array($key1,$colunas_view)){

        $cols[] = $value1;      
        if($key==0) {
          $colunas[] = $key1; 
        }
     
      };


    }

    $linhas[] = '<td>'.implode('</td><td>',$cols).'</td>';
    unset($cols);
  }

  return '<table width="100%"> <tr><th>'.implode('</th><th>',$colunas).'</td></th> </tr><tr>'.implode('</tr>',$linhas).'</tr></table>';
}

//Inclui em Template
if($TEMPLATE[status]==true){  
  $TEMPLATE[conteudo]  = get_include(ROOT.'..'.$_SERVER['PHP_SELF']);
  include_once($TEMPLATE[template]);
  $TEMPLATE[template] = 'template.php';
  die;
}

function template($file){
  global $TEMPLATE;

  $TEMPLATE[conteudo] = ob_get_contents();

  ob_end_clean();
  
  include_once($file);
}


///////////////Dados da empresa

//$TEMPLATE[empresa] = buscar_mysql(dados_empresa,1);
//$TEMPLATE[empresa][logo] = URL.'/imgs/logo_elite.png';
//ob_start();


function removeCaracter($string) {

    // matriz de entrada
    $what = array('  ',"\n","\t");

    // matriz de saída
    $by   = array('','','');

    // devolver a string
    return str_replace($what, $by, $string);
}






///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////



function transmitenota($acao, $dados){

  $config_empresa = buscar_mysql(dados_empresa,1);

  $enviar[ApiKey] = 'vmv99YtrIrM2bfAnaNioAaltI';
  $enviar[Cnpj]   = $config_empresa[cnpj];
  $enviar[Dados]  = $dados;


  $url = 'http://api1.transmitenota.com.br/api/producao/'.$acao;

  $jsons =  json_encode($enviar);

  $ch = curl_init($url);

  curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

  curl_setopt($ch, CURLOPT_FOLLOWLOCATION ,1);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER ,0);
  curl_setopt($ch, CURLOPT_URL, $url);

  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $jsons);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(

    'Content-Type: application/json',
    'Accept: application/json',

    'Content-Length: ' . strlen($jsons))

  );

  curl_setopt($ch, CURLOPT_RETURNTRANSFER ,1);

  return json_decode(curl_exec($ch),true);
}
?>