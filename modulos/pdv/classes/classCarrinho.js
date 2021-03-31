class Carrinho extends classPadrao{
	constructor(parans={}){
		super(parans);

		//---------------------------------------------------------------------//
		//this.title='Carrinho:'
		if(!this.id)this.id=this.codId()
		this.dataIn=0
		this.dataFim=0
		this.client=0
		this.informacoes=''
		this.valortotal=0
		this.valorpago=0
		this.valortroco=0
		this.pagamentos=[]

		//Execulda Mewtdos de Entrada
		//---------------------------------------------------------------------//
		this.onCreate(Object.assign(this, parans));		
		this.onSetCarrinho = parans.onSetCarrinho ? (parms1) => parans.onSetCarrinho(parms1) : ()=>{} ;
		this.onTotal = parans.onTotal ? (parms1) => parans.onTotal(parms1) : ()=>{} ;
	}
	selectProduto(params){		
		this.produtos_selected = params;		
		//console.log(this.produtos_selected);		
	}

	subSelectProduto(params){		
		//Busca Na Lista
		//---------------------------------------------------------------------//
		var pos = this.list[this.selected].produtos.map(function(e) { return e.cod; });
		var index = pos.indexOf(params.cod);
		//Regra de Adção Caso Exista
		//---------------------------------------------------------------------//
		if (index > -1 && params.qnt>=2) {	

			params.qnt = this.list[this.selected].produtos[index].qnt;
			delete this.list[this.selected].produtos.splice(index, 1);
			params.qnt--;	

			//Caucula Total
			//---------------------------------------------------------------------//
			params.total = ((params.preco-0)*(params.qnt-0)).toFixed(2);
			//Adiciona na Lista
			//---------------------------------------------------------------------//
			this.list[this.selected].produtos.push(params);
			//Retorna para Evento
			//---------------------------------------------------------------------//
			this.onSetCarrinho(this.getCarrinho());	
		}
	}

	getselectProduto(){		
		return this.produtos_selected;
	}
	delCarrinho(params){

		//Busca Na Lista
		//---------------------------------------------------------------------//
		var pos = this.list[this.selected].produtos.map(function(e) { return e.cod; });
		var index = pos.indexOf(params.cod);

		//Seleciona e apaga
		//---------------------------------------------------------------------//
		if (index > -1) {
			this.list[this.selected].produtos.splice(index, 1);
			this.selectProduto(this.list[this.selected].produtos[index-1]);
		}			

		//Retorna para Evento
		//---------------------------------------------------------------------//
		this.onSetCarrinho(this.getCarrinho());	
	}
	setCarrinho(params){

		//Busca Na lista
		//---------------------------------------------------------------------//
		var pos = this.list[this.selected].produtos.map(function(e) { return e.cod; });
		var index = pos.indexOf(params.cod);


		//Regra de Adção Caso Exista
		//---------------------------------------------------------------------//
		if (index > -1) {			
			params.qnt = this.list[this.selected].produtos[index].qnt;
			delete this.list[this.selected].produtos.splice(index, 1);
			params.qnt++;
		}else{
			params.qnt=1;
		}

		//Caucula Total
		//---------------------------------------------------------------------//
		params.total = ((params.preco-0)*(params.qnt-0)).toFixed(2);

		//Adiciona na Lista
		//---------------------------------------------------------------------//
		this.list[this.selected].produtos.push(params);

		//Aciona O seletor
		//---------------------------------------------------------------------//
		this.selectProduto(params);

		//Aciona O seletor
		//---------------------------------------------------------------------//
		this.somaTotal(params);

		//Retorna para Evento
		//---------------------------------------------------------------------//
		this.onSetCarrinho(this.list[this.selected]);
	}	
	somaTotal(){		
		
		let valorTotal = 0;
		let valorPgto = 0;
		this.list[this.selected].produtos.forEach(function(name){
		   if((name.total-0)>=0){
		   	valorTotal += name.total-0;
		   }else{
		   	valorPgto += -(name.total-0);
		   }
		});
		this.list[this.selected].valorTotal = valorTotal.toFixed(2);
		this.list[this.selected].valorPgto = valorPgto.toFixed(2);
		
		return this.list[this.selected];
	}

	getCarrinho(idVenda=false){
		if(!idVenda)idVenda=this.selected;
		let saida = (this.list[idVenda].produtos).slice();		
		return (saida.reverse());
	}	

}