<?php
    include_once('../../funcoes.php');

/*
    if($_POST[carrinho]){

        $carrinho = json_decode($_POST[carrinho],1);

        $carrinhoList = array_map(function($dados){
           return '
           <td>
                '.$dados[cod].'<br>
                <b>'.$dados[produto].'</b>
            </td>
           <td class="center" ><b>'.$dados[qnt].'</b></td>
           <td class="right" >R$ '.$dados[preco].'</td>
           <td class="right" ><b> R$'.$dados[total].'</b></td>';
        }, $carrinho[produtos]);


        $carrinhoList = implode('</tr><tr>',$carrinhoList);


    }
    */
?>
<center id="preco">
    <h1 style="font-size: 16px">SERVE MAIS COM PREÇO E QUALIDADE</h1>    
    <div >
        <div style="font-size: 20px">De:</div>
        <b style="font-size: 20px">R$</b>
        <b style="font-size: 40px; text-decoration: line-through"> 35,99</b>
        <b style="font-size: 30px">/UN</b>
    </div>
    <div >
        <div style="font-size: 20px">Por:</div>
        <b style="font-size: 30px">R$</b>
        <b style="font-size: 60px"> 25,99</b>
        <b style="font-size: 30px">/UN</b>
    </div>
</center>
  
<style type="text/css">
    *{
        font-family: arial;
        font-size: 12px;
    }
    table{
        width: 100%;
    }
    #preco{
        margin-top: 80px;
        transform: rotate(90deg);
        width: 250px;
        padding: 12px;
        border: 1px solid;
    }
    .right{
        text-align: right;
    }
    .center{
        text-align: center;
    }
    .LP{

    }
</style>