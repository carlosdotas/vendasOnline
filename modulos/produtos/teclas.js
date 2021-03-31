//Tecla de Comando do Sistema
/*-----------------------------------------------------------------*/

//Limpa Teclas
/*-----------------------------------------------------------------*/
$( "body" ).unbind( "keyup");
$( "body" ).unbind( "keydown");

//Seta Teclas
/*-----------------------------------------------------------------*/

$('body').teclas({
	keyDown:function(){ //Ao Precionar Qualquer Tecla Focar no Campo de busca
		//if (!$('#buscaPorCodigo').is(":focus")) {
		//  $('#buscaPorCodigo').select()
		//}

	},

	/*-----------------------------------------------------------------*/
	//ArrowLeft:function(){ //Seleciona Lista Pra Esquerda
		//if(window.colSele<=2)window.colSele = window.colSele--;	
	//},	
	//ArrowRight:function(){ //Seleciona Lista Pra Direita
		//if(window.colSele>=2)window.colSele = window.colSele--;
	//},		
	ArrowUp:function(){ //Seleciona para Cima
		var getSelected = $('#listDeProdutos').datagrid('getSelected');
		var getRowIndex = $('#listDeProdutos').datagrid('getRowIndex',getSelected);		
		$('#listDeProdutos').datagrid('selectRow',getRowIndex-1);	
	},
	ArrowDown:function(){ //Seleciona para Baixo
		var getSelected = $('#listDeProdutos').datagrid('getSelected');
		var getRowIndex = $('#listDeProdutos').datagrid('getRowIndex',getSelected);		
		$('#listDeProdutos').datagrid('selectRow',getRowIndex+1);	
	}
});	
