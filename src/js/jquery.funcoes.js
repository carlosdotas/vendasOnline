
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

		///////// Saida
		//////////////////////////////////////////////////////////////////		
		$(this).datalist(objeto);
	}
})( jQuery );

//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.easuiTabs = function(dados){

	}
})( jQuery );


//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.keySeletor = function(params,id){	

		//Parametros
		let thisobject = this
		let classSeletor = params.classSeletor;
		let classKey     = params.classKey;

		//Eventos
		$(this)[0].onSelect = params.onSelect ? (data1,data2)=> params.onSelect(data1,data2) : ()=>{}
		$(this)[0].onSend = params.onSend ? (data1,data2)=> params.onSend(data1,data2) : ()=>{}
		
		//Start
		$( this )[0][classSeletor] = -1;
		onKeyUp();

		//Metodos
		function onKeyUp(){
			$( classKey ).keyup(function(event) {
				let totalElements = (thisobject.length-1);

			  	if(event.keyCode==40){
			  		$( thisobject )[0][classSeletor]++;
			  		aplicaSelecao();
			  	}
			  	if(event.keyCode==38){
			  		$( thisobject )[0][classSeletor]--;
			  		aplicaSelecao();
			  	}

			  	if(event.keyCode==13){
	  				$( thisobject )[0].onSend(
						$( thisobject )[0][classSeletor],
						$( thisobject ).eq( $( thisobject )[0][classSeletor] )
					);
  				}

				if($( thisobject )[0][classSeletor] >= totalElements)$( thisobject )[0][classSeletor] = totalElements;
				if($( thisobject )[0][classSeletor] <= 0)$( thisobject )[0][classSeletor] = 0;

			  	
			});
		}

		function aplicaSelecao(){
			$( thisobject ).removeClass( classSeletor );
			$( thisobject ).eq( $( thisobject )[0][classSeletor] ).toggleClass( classSeletor );
			$( thisobject )[0].onSelect(
				$( thisobject )[0][classSeletor],
				$( thisobject ).eq( $( thisobject )[0][classSeletor] )
			);
		}
	}
})( jQuery );

//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.templateJquery = function(params){	

		//Parametros
		let thisobject = this
		let template = templater(params.template)
		let data = params.data

		//Eventos
		$(this)[0].onRender = params.onRender ? (data1)=> params.onRender(data1) : ()=>{}
			
		
		//Metodos

		////////////////////////////////////////////////////////
		function render(data,template){
			let saidaHtml = '';
			for (var prop in data) {
				if(typeof  data[prop] == 'object'){	
					let dados = data[prop];
					saidaHtml += '<div class="templateJquery" ref="'+prop+'">'+render(dados,template)+'</div>';
				}else{
			  		template = template.replace("{"+prop+"}", data[prop]);
			  	}	  	
			};
			if(saidaHtml)template = saidaHtml;

			$(thisobject)[0].onRender(thisobject);
		   
			return template;
		}

		////////////////////////////////////////////////////////
		function templater(template){
			if(template.substr(0, 1)=='#') return $(template).html();
			return template;
						
		}
		
		$(this).html(render(data,template));
		return this;
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
		if(funcao=="off"){
			
			return false;
		}
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
			var tecla = event.originalEvent.key;
			if(dados[tecla]){
				event.preventDefault();
				dados[tecla]();
			}

			var teclado = (event.which)
			if(dados[teclado]){
				event.preventDefault();
				dados[teclado]();
			}

			if(dados.keyDown)dados.keyDown(tecla);
		});
	}
})( jQuery );

//////////////////////////////////////////////////////////////////
//Funçao de Busca Jquery
//////////////////////////////////////////////////////////////////
(function( $ ){
	$.fn.buscar = function(dados){	
		$( this ).bind( "keyup", function(event) {	

			//console.log(event.which);

			var text = '';
			var type = 'text';
			var value = $( this ).val();			
			var detectIn = 0;
			var qnt = 1;
			var tecla = event.originalEvent.key;
			var which = event.which;
			var codeSize = 7;

			if(isNumber(value)){
				type = 'numbers';
			}

			if(value.substring(0, 1)=='='){
				type = 'calculadora';
			}

			if(value==""){
				type="nulo"
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
					if((output.val-0)<=0.001){
						$(this).maskMoney({prefix:'-',thousands:'', decimal:'.'});
						output.type = "negative";
					}else{										
						$(this).maskMoney({thousands:'', decimal:'.'});
					}
					//if(dados.onMoneyDetect)dados.onMoneyDetect(output);
				}

				if(output.type=="numbers" && output.sizer>=codeSize){
					output.type = "cod";
					$(this).maskMoney({thousands:'', decimal:''});
					//if(dados.onCodeDetect)dados.onCodeDetect(output);
				}

				if(output.type=="text"){
					//if(dados.onTextDetect)dados.onTextDetect(output);
				}

				if(output.type=="calculadora"){
					var calculo = value.substring(1, 256);
					let re = /\,/gi;
					calculo = calculo.replace(re, ".");
					output.text = calculo;
					eval('var calc = '+calculo)
					output.val = calc;
				}

				if((output.val=="")){
					output.type="limpo"
				}

				switch (tecla) {
				  case 'ArrowUp': case 'ArrowDown': case 'ArrowLeft': case 'ArrowRight':
				  case '+': case '-': case '/': case '*':case '=':case ',':case '.':
				  case 'Delete': 

				    output.type="tecla";
				    break;				    
				}


				if(dados.onkeyup)dados.onkeyup(output);

			}else{
				$(this).maskMoney('destroy');
			}

			if(event.which==27){	//Tecla Enter
				event.preventDefault();
				$(this).maskMoney('destroy');
				$(this).val('');			
				//if(dados.onSend)dados.onClean(output);	
			}		
			if(event.which==13){	//Tecla Enter
				event.preventDefault();
				$(this).maskMoney('destroy');
				$(this).val('');
				//$(this).select();

				if(dados.onSend)dados.onSend(output);
			}
			
			if(dados.onKeyup)dados.onKeyup(output);

		});
	}

})( jQuery );