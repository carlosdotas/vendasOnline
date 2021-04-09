//Tecla de Comando do Sistema
/*-----------------------------------------------------------------*/

//Tecla de Comando do Sistema
/*-----------------------------------------------------------------*/
desativaTeclas();
ativarTeclasModuloProdutos();


//Seta Teclas
/*-----------------------------------------------------------------*/
function ativarTeclasModuloProdutos(){
	$('body').teclas({
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
}