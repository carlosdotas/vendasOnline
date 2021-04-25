///////////////////////////////////////////////////
///////// Metodos Funcoes dp Carrinho
///////////////////////////////////////////////////
const lista = (data) =>{	

	///////// Parametros
	//////////////////////////////////////////////////////////////////
	let objeto = {
		qntItens:0,
		qntTotal:0,
		ValorTotal:0,
		lista:{},
	};

	///////// Sets Parametros
	//////////////////////////////////////////////////////////////////
	Object.assign(objeto, data);

	///////// Eventos
	//////////////////////////////////////////////////////////////////
	var onSet = (value)=>{

		objeto.qntItens = Object.keys(objeto.lista).length ;

		var totais = setQntsTotal(objeto.lista);
		objeto.qntTotal = totais.qnt;
		objeto.ValorTotal = totais.preco;

		return data.onSet ? data.onSet(objeto) : 0;
	};

	///////// Metodos
	var setQntsTotal = (lista)=>{
		var retorno = {qnt:0,preco:0};
		Object.entries(lista).forEach((values)=>{
			retorno.qnt   = values[1].qnt+retorno.qnt;
			retorno.preco = values[1].preco+retorno.preco;
		});
		return retorno;
	}
	
	//////////////////////////////////////////////////////////////////
	objeto.add = (arry)=>{
		var codigo = "cod_"+arry.cod;
		if(!arry.qnt)arry.qnt=1;
		if(objeto.lista[codigo]){
			arry.qnt = (objeto.lista[codigo].qnt+1);
		}
		arry.total = (arry.qnt*arry.preco).toFixed(2);
		objeto.lista[codigo] = arry;
		onSet(objeto);		
	}
	//////////////////////////////////////////////////////////////////
	objeto.remove = (codigo,qnt)=>{
		var codigo = "cod_"+codigo;
		if(objeto.lista[codigo].qnt>=1){
			objeto.lista[codigo].qnt = (objeto.lista[codigo].qnt-1);
			objeto.lista[codigo].total = (objeto.lista[codigo].qnt*objeto.lista[codigo].preco).toFixed(2);
			objeto.lista[codigo] = objeto.lista[codigo];
		}
		onSet(objeto);
	}
	//////////////////////////////////////////////////////////////////
	objeto.del = (codigo)=>{
		delete objeto.lista["cod_"+codigo];
		onSet(objeto);
	}
	//////////////////////////////////////////////////////////////////
	objeto.edit = (arry)=>{
		arry.total = arry.qnt*arry.preco;
		objeto.lista["cod_"+arry.codigo]=arry;		
		onSet(objeto);
	}


	return objeto;
}

//////////////////////////////////////////////////////////////////
function SESSION(data){
	var objeto = {
		url:window.location.href,
		modulos:window.location.href+'modulos/',
	};
	return objeto;
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function getJSON(url){
	$.ajaxSetup({  async: false });

 	var saida;
	$.getJSON(url, function(resultado){
		saida = resultado;
	});

	$.ajaxSetup({ async: true });

	return saida;			
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function buscarNomeGoogle($cod){
	return getJSON(home+'/buscar_produtos/?cod='+$cod).nome;
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function mikrotime(){
	var date  = new Date();
	var timestamp = Math.round(date.getTime()/1000 | 0); 
	return timestamp;
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function dataHota(){
	return new Date();	
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function getRandomInt(min=1000, max=9999) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function getCodTimer(min=1000, max=9999) {
  min = Math.ceil(min);
  return mikrotime()+''+getRandomInt(min, max);
}


///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function geraCodigo(){
	return calcMD5(mikrotime()+'_'+getRandomInt(1000, 9999));
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

///////////////////////////////////////////////////
///////// Outras Funcoes
//////////////////////////////////////////////////
function postPrint(data,url){

    $('body').append('<iframe name="iframePrint" id="iframePrint" src="'+url+'"></iframe>');
    $('body').append('<form action="'+url+'" method="post" target="iframePrint" id="postToIframe"></form>');
    $('#postToIframe').append('<input type="hidden" name="carrinho" value=\''+data+'\' />');
    $('#postToIframe').submit().remove();;

	setTimeout(function(){ 

		document.getElementById("iframePrint").contentWindow.print();

	}, 500);

    

}
///////////////////////////////////////////////////
///////// Console.log
//////////////////////////////////////////////////
function cl(value){
	console.log(value);
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////// Funcões  Easyui
//////////////////////////////////////////////////
function dialog(dataIn){
    
	//Parametros
	//---------------------------------------------------------------------//
	let id = dataIn.id ? dataIn.id : mikrotime();
	let valuesInput = dataIn.valuesInput ? dataIn.valuesInput : {};
	let focus = dataIn.focus ? dataIn.focus : '';

	//Eventos
	//---------------------------------------------------------------------//
	let onClose = dataIn.onClose ? (parms1) => dataIn.onClose(parms1) : ()=>{} ;
	let onOpen = dataIn.onOpen ? (parms1) => dataIn.onOpen(parms1) : ()=>{} ;
	let onSave = dataIn.onSave ? (parms1,parms2) => dataIn.onSave(parms1,parms2) : ()=>{} ;

	//Botoens
	//---------------------------------------------------------------------//
	let save = {text:'Salvar',id:'Salvar_'+id,
        handler:function(){
            onSave(serializador(),id);
        }}
	let cancel = {text:'Fechar',
        handler:function(){
            $('#'+id).dialog('close');
            onClose(id);
        }}

	let botoes = [save,cancel];

	//Funcoes
	//---------------------------------------------------------------------//

    $.get(dataIn.href, function( data ) {

        let conteudo = '<form id="form_'+id+'">'+data+'<form>';
        $('body').append('<div id="'+id+'" >'+conteudo+'</div>');    	

        let metas = $('#'+id).parent().find('meta');

		//Set Parametros
		//---------------------------------------------------------------------//
	    var dataIn = Object.assign({
	        width: metas.attr('width'),
	        height: metas.attr('height'),
	        title: metas.attr('title'),
	        modal:  true,
	        buttons:botoes,
	        onClose:function(){  
	            onClose(id);
	            $('#'+id).dialog('destroy');                
	        }
	    },dataIn);

		//Senderiza Dialog
		//---------------------------------------------------------------------//
        $('#'+id).dialog(dataIn);

        //---------------------------------------------------------------------//
       	$("#"+id+' '+focus).focus();

       	//---------------------------------------------------------------------//
        keyUpDialog();
        setValues();
        onOpen(id);
    });   
   
	//---------------------------------------------------------------------//
    function keyUpDialog(){
        $( "#"+id ).keyup(function(event) {
			if ( event.which == 27 ) {
				$('#'+id).dialog('close');
			}else if( event.which == 13 ){
				$('#Salvar_'+id).click();				
			}			
		});
    }   
	//---------------------------------------------------------------------//
    function setValues(){
        $.each(valuesInput, function( index, value ) {
            $("#"+id+' [name="'+index+'"]').val(value);
        });   
    }  
	//---------------------------------------------------------------------//
    function serializador(){
    	let retorno = {};
        $.each($('#form_'+id).serializeArray(), function( index, value ) {
            retorno[value.name] = value.value
        });   
        return retorno
    }      
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////// Funcões  Easyui
//////////////////////////////////////////////////
function tabs(array,select){
    array.map(function(dados){
        $('#contentTab').tabs('add',{
            href:dados.href,
            title:dados.title,
        //    closable:false
        });
    });
    setTimeout(function(){ 
        $('#contentTab').tabs('select',select);
        $('#codigo').focus()
    }, 500);
}

function addZeroes(num, len=5) {
    var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;
      
  while(counter < len) {
  
      numberWithZeroes = "0" + numberWithZeroes;
    
    counter++;
  
    }
  
  return numberWithZeroes;
}

///////// Funcões  Google
//////////////////////////////////////////////////
//	googleSearch('Pandinha',function($value){
//		console.log($value);
//	})
//////////////////////////////////////////////////
async function googleSearch(busca,funcao,key="AIzaSyAuRFhq0UJJU9Z1ChQdKKK_8AptzM00buU"){
		
	let url = `https://www.googleapis.com/customsearch/v1?q=${busca}&num=10&cx=013594553343653397533:q-qkkaltmay&key=${key}&cr=countryBR&lr=lang_pt`;
	let saida = await $.get(url,function(data){
 		funcao(data);			 	
 	});
		
	return 	saida;	
}

//////////////////////////////////////////////////
//	
//////////////////////////////////////////////////
function template(valueIn){
	let content = valueIn.content;
	let object  = valueIn.object;
	for (var prop in object) {
	  	content = content.replace("${"+prop+"}", object[prop]);
	};
	return content;
}

//////////////////////////////////////////////////
//	
//////////////////////////////////////////////////
function geraListaHtml(templateInt,lista){
	let saidaHtml = '';
	for (var prop in lista) {
		saidaHtml = template({
			content:$(templateInt).html(),
			object:lista[prop]
		})+saidaHtml;		
	}
	return saidaHtml;
}


//////////////////////////////////////////////////
//	
//////////////////////////////////////////////////
function totalVendas(){
	let totalVendas = localStorage.getItem('totalVendas')-0;
	if(!totalVendas){
		totalVendas  = 0;
	}
	totalVendas++;
	localStorage.setItem('totalVendas',totalVendas);	



	return addZeroes(totalVendas);
}



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

function jsonStorage(){

	return {

	    setItem: function (key,value) {
			localStorage.setItem(key, JSON.stringify(value));
			return JSON.parse(localStorage.getItem(key));
	    },
	    getItem: function (key) {
	        return JSON.parse(localStorage.getItem(key));
	    }
	}

}

jsonStorage.setItem('teste',{teste:'Simples'})