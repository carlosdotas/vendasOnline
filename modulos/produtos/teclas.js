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
		if (!$('#buscaPorCodigo').is(":focus")) {
		  $('#buscaPorCodigo').select()
		}
	},
	//Teclas por Codigo
	/*-----------------------------------------------------------------*/	
	188:function(){ //Tecla < = Muda de Pasta de Venda para Esquerda
							
	},	

	//Teclas Menu
	/*-----------------------------------------------------------------*/	
	F2:function(){ //Livre

	},

	//Teclas de Seleção de Itens
	/*-----------------------------------------------------------------*/
	ArrowLeft:function(){ //Seleciona Lista Pra Esquerda
		window.listSelected = '#listaDeProdutos';	
		$(window.listSelected).datagrid('selectRow',0);	
	},	
	ArrowRight:function(){ //Seleciona Lista Pra Direita
		window.listSelected = `#list_${carrinhos.selected}`;
		$(window.listSelected).datagrid('selectRow',0);	
	},					
	ArrowUp:function(){ //Seleciona para Cima
		var getSelected = $(window.listSelected).datagrid('getSelected');
		var getRowIndex = $(window.listSelected).datagrid('getRowIndex',getSelected);		
		$(window.listSelected).datagrid('selectRow',getRowIndex-1);	
	},
	ArrowDown:function(){ //Seleciona para Baixo
		var getSelected = $(window.listSelected).datagrid('getSelected');
		var getRowIndex = $(window.listSelected).datagrid('getRowIndex',getSelected);		
		$(window.listSelected).datagrid('selectRow',getRowIndex+1);	
	}
});	