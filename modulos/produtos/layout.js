//Gera Layout de PDV
/*-----------------------------------------------------------------*/
$( document ).ready(function() {

	/*-----------------------------------------------------------------*/
	$('#layoutProdutos').layout({fit:true,});
	$('#layoutProdutos').layout('add',{//Gera Menu Superior do Modulo
	    region: 'north',
	    border:0,
	    bodyCls:'gradiente1'
	});
	$('#layoutProdutos').layout('add',{//Gera Menu Superior do Modulo
	    region: 'west',
	    width:250,
	    border:0,
	    bodyCls:'blocoDeFiltros',
	    content:`<div class="contentLeft"></div>`
	});
	$('#layoutProdutos').layout('add',{//Gera conteudo Central do Modulo
	    region: 'center',
	    border:0,
	    bodyCls:'sombra_Interna_foot pdg5',
	    content:'<div id="listDeProdutos"></div>'
	});

	/*-----------------------------------------------------------------*/
	$('.contentLeft').layout({fit:true,});
	$('.contentLeft').layout('add',{//Gera Menu Superior do Modulo
	    region: 'north',
	    border: 0,
	    bodyCls:'blocoDeFiltros pdg5',
	    content:`<button id="cadastroRapido">Adicionar</button>
				 <button>Imprimir</button>
	    		`
	});
	$('.contentLeft').layout('add',{//Gera Menu Superior do Modulo
	    region: 'center',
	    border:0,
	    title:'Filtros',
	    bodyCls:'blocoDeFiltros pdg5',
	    content:`<form id="filtro">
				<input type="text" name="cod" placeholder="Código">
				<input type="text" name="produto" placeholder="Produto">
				<input type="text" name="preco" placeholder="Preço">
				</form>
	    		`
	});

	/*-----------------------------------------------------------------*/	
	$('#listDeProdutos').datagrid({
		fit:true,
		pageList:[25,50,100,200,500],
		pageSize:25,
		fitColumns:true,
		rownumbers:true,
		singleSelect:true,
	    url:'server.php?json=produtos',
	    pagination:true,
	    bodyCls:'inputList',
	    columns:[[
	        {sortable:true,field:'remove',title:'#',width:0,align:'center',
		    formatter: function(value,row,index){
				return `<button class="bntAcionList bntEdit" ref="${row.produtos_id}" json='${JSON.stringify(row)}' >Edit</button><button class="bntAcionList bntRemove" ref="${row.produtos_id}">Remove</button>`;
			}},	    
	        {sortable:true,field:'produtos_id',title:'#',width:0,align:'center'},	    
	        {sortable:true,field:'cod',title:'Code',width:100,align:'center',
		    formatter: function(value,row,index){
				return `<input index="1_${index}" class="inputTable" ref="${row.produtos_id}" name="cod" value="${value}">`;
			}},
	        {sortable:true,field:'produto',title:'Produto',width:350,
		    formatter: function(value,row,index){
				return `<input index="2_${index}" class="inputTable" class="money" ref="${row.produtos_id}" name="produto" value="${value}">`;
			}},
	        {sortable:true,field:'preco',title:'Preço',width:80,align:'center',
		    formatter: function(value,row,index){
				return `<input index="3_${index}" class="inputTable money" ref="${row.produtos_id}" name="preco" value="${value}">`;
			}}
	    ]],
	    onLoadSuccess:function(){
	    	$('.money').maskMoney({thousands:'', decimal:'.'});
			$( ".inputTable" ).keyup(function(event) {
				let tecla = event.originalEvent.key;
			  	if(tecla=='Enter'){

			  		var save = {};
			  		save['salvar'] = 'produtos';
			  		save['produtos_id'] = $(this).attr('ref');
			  		save[$(this).attr('name')] = $(this).val();

					$.post( "server.php", save, function( data ) {
						console.log(data)
					});

			  	}
			});	
			/*-----------------------------------------------------------------*/
			$('.bntRemove').click(function(){
				$.post( "server.php?exclui_mysql=produtos", {id:$(this).attr('ref')}, function( data ) {
					$('#listDeProdutos').datagrid('reload');				
				});
			})    	
			/*-----------------------------------------------------------------*/
			$('.bntEdit').click(function(){
				//console.log($(this).attr('json'))
				dialogCadastroRapido({
					valuesInput:JSON.parse($(this).attr('json'))
				});
			}) 
	    },
	    onSelect:function(index){
	    	//$(`[index="1_${index}"]`).focus();
	    }
	});


});	