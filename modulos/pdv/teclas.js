//Tecla de Comando do Sistema
/*-----------------------------------------------------------------*/
ativaTeclasPDV();

//Seta Teclas
/*-----------------------------------------------------------------*/
function ativaTeclasPDV(){
	desativaTeclas();

	$('body').teclas({
		keyDown:function(){ //Ao Precionar Qualquer Tecla Focar no Campo de busca
			if (!$('#buscaPorCodigo').is(":focus")) {
			  $('#buscaPorCodigo').select()
			}
		},
		188:function(){ //Tecla < = Muda de Pasta de Venda para Esquerda
			var tab = $('#blockCarrinhos').tabs('getSelected');
			var index = $('#blockCarrinhos').tabs('getTabIndex',tab);			
			$('#blockCarrinhos').tabs('select', index-1);							
		},	
		190:function(){ //Livre > Muda de Pasta de Venda para a Direita
			var tab = $('#blockCarrinhos').tabs('getSelected');
			var index = $('#blockCarrinhos').tabs('getTabIndex',tab);			
			$('#blockCarrinhos').tabs('select', index+1);								
		},	
		Enter:function(){
			//$('#listaDeProdutos').datagrid('unselectAll');
		},
		F2:function(){ //Livre

			console.log(carrinhos.getselectProduto())
	        dialogCadastroRapido({
	            valuesInput:carrinhos.getselectProduto(),
	            onOpen:function(){
	                desativaTeclas();
	                $('[name="preco"]').select();
	            },
	            onClose:function(){
	                $('#listaDeProdutos').datalist('reload');
	                ativaTeclasPDV();
	            }
	        });
	        
		},
		F4:function(){ //Abre nova Venda
			
			/*-----------------------------------------------------------------*/
			carrinhos.set({ //Gera Contedudo de Produtos
			    title:'Venda',
			    id:totalVendas(),
			    closable:true,
			    produtos:[]    
			});

		},
		F5:function(){ 

		},
		F9:function(){ //Imprimir

			console.log(carrinhos.list[carrinhos.selected]);

			var carrinhoJson = JSON.stringify(carrinhos.list[carrinhos.selected]);				
			postPrint(carrinhoJson,'print.php');

		},	
		Delete:function(){ //Deleta Item Selecionado
			carrinhos.delCarrinho(carrinhos.getselectProduto());
		},	
		'+':function(){
			carrinhos.setCarrinho(carrinhos.getselectProduto());
		},
		'/':function(){ //Remove Item
			carrinhos.subSelectProduto(carrinhos.getselectProduto());
		},				
		Escape:function(){ //Limpa Campos e Fecha Vendas
			if($('#buscaPorCodigo').val().length==0){	
				var tab = $('#blockCarrinhos').tabs('getSelected');
				var index = $('#blockCarrinhos').tabs('getTabIndex',tab);			
				$('#blockCarrinhos').tabs('close', index);								
			}
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
}