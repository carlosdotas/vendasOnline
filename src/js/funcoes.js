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
    document.getElementById("iframePrint").contentWindow.print();

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
    var id          =   mikrotime();
    var valuesInput =   dataIn.valuesInput; delete dataIn.valuesInput;
    var onClose     =   dataIn.onClose; delete dataIn.onClose;
    var onOpen	    =   dataIn.onOpen; delete dataIn.onOpen;

    var dataIn = unirObj({
        title: 'Title',
        width:  550,
        closed: false,
        border:  false, 
        modal:  true,
        buttons:[{
            text:'Salvar',
            id:'Salvar_'+id,
            handler:function(){
                var inputs = {};
                $.each($('#form_'+id).serializeArray(), function( index, value ) {
                    inputs[value.name]=value.value;
                });                    
                dataIn.onSave({
                    id:id,
                    inputs:inputs
                });                    
            }
        },{
            text:'Fechar',
            handler:function(){
                $('#'+id).dialog('close');
            }
        }],
        onClose:function(){  
            onClose();
            $('#'+id).dialog('destroy');                
        }
    },dataIn);

    $.get(dataIn.href, function( data ) {
        delete dataIn.href;
        dataIn.content = '<form style="padding:5px" id="form_'+id+'">'+data+'<form>';            
        $('<div id="'+id+'" ></div>').dialog(dataIn);

        $( "#"+id ).keyup(function(event) {
			if ( event.which == 27 ) {
				$('#'+id).dialog('close');
			}else if( event.which == 13 ){
				$('#Salvar_'+id).click();				
			}			
		});

        $.each(valuesInput, function( index, value ) {
            $('[name="'+index+'"]').val(value);
        });

        $("#"+id).parent().find('input')[0].focus();

        onOpen(data);
    });        

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
	try{		
		let url = `https://www.googleapis.com/customsearch/v1?q=${busca}&num=10&cx=013594553343653397533:q-qkkaltmay&key=${key}&cr=countryBR&lr=lang_pt`;
		let saida = await $.get(url,function(data){
	 		return data;		 	
	 	});
		funcao(saida);		
		return 	saida;	
	} catch{
		console.log('ERROR googleSearch');
	}	
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
