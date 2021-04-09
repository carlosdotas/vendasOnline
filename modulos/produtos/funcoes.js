//Gera Layout de PDV
/*-----------------------------------------------------------------*/
$( document ).ready(function() {

	//Regras de Friltro
	/*-----------------------------------------------------------------*/
	$( "#filtro" ).keyup(function(event) {
		$this = this;
		$().Deley(function(){
			$('#listDeProdutos').datagrid({
	    		url:'server.php?json=produtos&'+$( $this ).serialize()
	    	});
		})
	});	 

	$('[name="cod"]').select();	

	//Abre Dialod Cadastro Rápido
	/*-----------------------------------------------------------------*/
	$('#cadastroRapido').click(function(){
		dialogCadastroRapido();
	})

});	