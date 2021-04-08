//Loaddings
/*-----------------------------------------------------------------*/
$( document ).ready(function() {
	$( document ).ajaxStart(function() {
	  	$.messager.progress();
	});
	$(document).ajaxSuccess(function() {
	 	$.messager.progress('close');
	});
	$( document ).ajaxError(function(y,x,r) {	
		$.messager.alert(`${y.type}`,`${y.type}!<br>Type:${r.type}<br>URL:${r.url}`,'info');
		$.messager.progress('close');
	});
});



//Limpa Teclas
/*-----------------------------------------------------------------*/
function desativaTeclas(){
	$( "body" ).unbind( "keyup");
	$( "body" ).unbind( "keydown");
}


//Metodos
/*-----------------------------------------------------------------*/
function dialogCadastroRapido(paramsIn={}){

	let onSendProdudo = paramsIn.onSendProdudo ? (parms1) => paramsIn.onSendProdudo(parms1) : ()=>{} ;



	let params = Object.assign({
		salvar:'produtos',
		focus:'[name="cod"]',
		href:'modulos/produtos/cadastroRapido.html',
	},paramsIn);

	dialog(Object.assign({
		onOpen:function(id){

		},
		onSave:function(params,id){
			var save = Object.assign({},params);

			if(!params.cod)return false;
			if(!params.produto)return false;
			if(!params.preco)return false;

			if(params.preco.length>=8){
				$('[name="preco"]').select();
				return false;
			}

			$.post( "server.php?ref=cod:"+save.cod, save, function( data ) {
				$('#'+id).dialog('close'); 
				$('#listDeProdutos').datagrid('reload');
				onSendProdudo(save);
				
			});
		}
	},params))		
}