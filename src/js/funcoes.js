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
		var codigo = arry.codigo;
		if(!arry.qnt)arry.qnt=1;
		if(objeto.lista[codigo]){
			arry.qnt = (objeto.lista[codigo].qnt+arry.qnt);
		}
		arry.total = arry.qnt*arry.preco;
		objeto.lista[codigo] = arry;
		onSet(objeto);		
	}
	//////////////////////////////////////////////////////////////////
	objeto.remove = (codigo,qnt)=>{
		if(objeto.lista[codigo].qnt>=1){
			objeto.lista[codigo].qnt = (objeto.lista[codigo].qnt-qnt);
			objeto.lista[codigo].total = objeto.lista[codigo].qnt*objeto.lista[codigo].preco;
			objeto.lista[codigo] = objeto.lista[codigo];
		}
		onSet(objeto);
	}
	//////////////////////////////////////////////////////////////////
	objeto.del = (codigo)=>{
		delete objeto.lista[codigo];
		onSet(objeto);
	}
	//////////////////////////////////////////////////////////////////
	objeto.edit = (arry)=>{
		arry.total = arry.qnt*arry.preco;
		objeto.lista[arry.codigo]=arry;		
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
