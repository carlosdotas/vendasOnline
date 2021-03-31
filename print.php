<?php
    include_once('funcoes.php');

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
?>
    <center>
        <div style="font-size: 12px"><b>SUPERMERCADO SERVE MAIS</b></div>
        <div style="font-size: 8px">SERVE MAIS COM PREÇO E QUALIDADE</div>                
        <hr>                
        <div>Rua Zeca Louza, nº 623 - Centro</div>                
        <div>Leopoldo de Bulhões - GO</div>                
        <div>Fone (whatsapp) :<b> (62) 99615-7340</b></div>                
        <div>Venda ID : <?php echo $carrinho[id]; ?></div>                
    </center>
    <hr>
    <center>Dodumento sem validade fiscal</center>
    <hr>
    <?php if($carrinho[cliente]){ ?>
    <center>Endereço para Entrega:</center>
    <center><b><?php echo $carrinho[cliente]; ?></b></center>
    <hr>
    <?php } ?>

    <table>
        <tr>
            <th align="left">DESCRIÇÃO</th>
            <th class="center" >QNT</th>
            <th class="right" >VL.U</th>
            <th class="right" >VL.T</th>
        </tr>
        <tr>
            <?php echo $carrinhoList;?>
        </tr>
    </table>
    <hr>
    <center></center>
    <table width="100%">
        <tr>
            <td align="left" class="LP" width="150">TOTAL</td>
            <td class="right LP"><b> R$ <?php echo $carrinho[valorTotal]; ?> </b></td>
        </tr>
        <tr>
            <td align="left" class="LP" width="150">VALOR PAGO</td>
            <td class="right LP"><b> R$ <?php if($carrinho[valorPgto]){echo $carrinho[valorPgto];}else{echo $carrinho[subTotal];}; ?> </b></td>
        </tr>
        <tr>
            <td align="left" class="LP" width="150">TROCO</td>
            <td class="right LP"><b> <?php echo moeda($carrinho[valorPgto]-$carrinho[valorTotal]); ?></b></td>
        </tr>
        <tr>
            <td align="left" class="LP" width="150">DATA</td>
            <td class="right LP"><b> <?php echo date('d/M/Y'); ?> </b></td>
        </tr>                                    
        <tr>
            <td align="left" class="LP" width="150">HORA</td>
            <td class="right LP"><b> <?php echo date('H:i:s'); ?> </b></td>
        </tr>                                    
    </table>
    <hr>
    <center> O SUPER MERCADO SERVE MAIS AGRADEÇE SUA PREFERENCIA</center>

<style type="text/css">
    *{
        font-family: arial;
        font-size: 8px;
    }
    table{
        width: 100%;
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