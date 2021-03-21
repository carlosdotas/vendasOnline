
//////////////////////////////////////////////////////////////////
//Funçao keyupDeley
//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.datalistTemplate = function(params){

		///////// Parametros
		//////////////////////////////////////////////////////////////////
		let objeto = {
			fit:true,
			border:0,
			pageSize:10,
			lines:true,
			pagination:true,
			textFormatter:function(value,row){
				var templateOut = $(params.template).html();
				$.each(row, function( index, value ) {
				  	if(templateOut)templateOut = templateOut.replace("{"+index+"}", value);
				});
				return templateOut;
			}

		};

		///////// Sets Parametros
		//////////////////////////////////////////////////////////////////
		Object.assign(objeto, params);
		
		//////////////////////////////////////////////////////////////////
		delete 	objeto.input,
				objeto.colMysql,
				objeto.template,
				objeto.keyup;

		if(params.keyup!=false){
			var dataListid = this;
			$(params.input).unbind();
			//////////////////////////////////////////////////////////////////		
			$(params.input).keyupDeley(function(){
				$(dataListid).datalist({
					url:params.url+'&'+params.colMysql+'='+$(params.input).val(),
					onLoadSuccess:function(){
						$(dataListid).datalist('selectRow',0);	
						//console.log('Buscando');
					}
				});
			},500);
		}
		///////// Saida
		//////////////////////////////////////////////////////////////////		
		$(this).datalist(objeto);
	}
})( jQuery );


//////////////////////////////////////////////////////////////////
//Funçao keyupDeley
//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.keyupDeley = function(funcao,timer){	
		var timeout = null;
		$(this).keyup(function() {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				funcao();
			}, timer);
		});
	}
})( jQuery );


//////////////////////////////////////////////////////////////////
//Funçao keyupDeley
//////////////////////////////////////////////////////////////////
(function( $ ){
	var timeout = null;
	$.fn.Deley = function(funcao){	
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			funcao();
		}, 400);		
	}
})( jQuery );

//////////////////////////////////////////////////////////////////
//Auto key UP
//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.teclas = function(dados){
		if(!dados.tipo)dados.tipo = "keydown";
		$( this ).bind( dados.tipo, function(event) {
			//console.log(event.which);
			$.each(dados, function( index, value ) {
				var tecla = event.originalEvent.key;
				
				if(tecla==index){
					event.preventDefault();
					dados[index]();
					return this;
				}			
			});
		});

		$( this ).bind( 'keydown', function(event) {
			//dados.onDown();
		});
		$( this ).bind( 'keyup', function(event) {
			//dados.onKeyup();
		});

	}
})( jQuery );

//////////////////////////////////////////////////////////////////
//Funçao de Busca Jquery
//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.buscar = function(dados){	
		$( this ).bind( "keyup", function(event) {	

			var text = '';
			var type = 'text';
			var value = $( this ).val();			
			var detectIn = 1;
			var qnt = 1;
			var tecla = event.originalEvent.key;
			var codeSize = 7;

			if(isNumber(value)){
				type = 'numbers';
			}

			if(value.substring(0, 1)=='='){
				type = 'calculadora';
			}

			var output = {
				qnt: qnt,
				text: text,
				val: value,
				sizer:value.length,
				type:type,
				tecla:tecla
			}

			if( output.val=='-0.00' || output.val=='0.00' || output.val=='000'){
				$(this).maskMoney('destroy');
				$(this).val('');
				return false;
			}

			if(output.sizer >= detectIn){

				if(output.type=="numbers" && output.sizer<=codeSize){
					output.val = (output.val-0).toFixed(2);
					output.type = "money";
					if((output.val-0)<=0.001 && (output.val-0)!=0){
						$(this).maskMoney({prefix:'-',thousands:'', decimal:'.'});
					}else{										
						$(this).maskMoney({thousands:'', decimal:'.'});
					}
					if(dados.onMoneyDetect)dados.onMoneyDetect(output);
				}

				if(output.type=="numbers" && output.sizer>=codeSize){
					output.type = "code";
					$(this).maskMoney({thousands:'', decimal:''});
					if(dados.onCodeDetect)dados.onCodeDetect(output);
				}

				if(output.type=="text"){
					if(dados.onTextDetect)dados.onTextDetect(output);
				}

				if(output.type=="calculadora"){
					var calculo = value.substring(1, 256);
					let re = /\,/gi;
					calculo = calculo.replace(re, ".");
					output.text = calculo;
					eval('var calc = '+calculo)
					output.val = calc;
				}


			}else{
				$(this).maskMoney('destroy');
			}


			//console.log(event.which);

			if(event.which==27){	//Tecla Enter
				$( dados.input ).focus();
				event.preventDefault();
				$(this).maskMoney('destroy');
				$(this).val('');			
				if(dados.onSend)dados.onClean(output);	
			}
			if(event.which==13 || event.which==107){	//Tecla Enter
				$( dados.input ).focus();
				event.preventDefault();
				$(this).maskMoney('destroy');
				$(this).val('');				
				if(dados.onSend)dados.onSend(output);
			}
			if(event.which==40){	//Tecla Descer
				event.preventDefault();
				if(dados.onClickKeyDown)dados.onClickKeyDown();
			}
			
			if(dados.onKeyup)dados.onKeyup(output);

		});
	}

})( jQuery );