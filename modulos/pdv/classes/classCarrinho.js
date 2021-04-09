class tabsCarrinhosEasyui{	
	constructor(params){
		this.element  = params.element;
		this.carrinho = {};
		this.columns  = params.columns;
		this.selected = 0;
		this.itemSelected = {};
		this.criaTab(this.element);
	}

	getSelected(){
		return this.selected
	}

	getItemSelected(){
		return this.itemSelected
	}

	criaTab(){
		let select = (select)=>{ this.selected = select}
		let element = this.element;
		$(this.element).tabs({
			fit:true,
		 	onSelect:function(title,id){
		 		let selected = $(element).tabs('getSelected').attr('id');
		 		select(selected);
		    }			
		});
	}
	
	onOpenNovaAba(id){
		let onOpenNovoCarrinho = (id) => {this.onOpenNovoCarrinho(id)}

		$(`#tab${id}`).layout({fit:true});		
		$(`#tab${id}`).layout('add',{//Gera Contedudo de Produtos
		    region: 'center',			    
		    border:0,	    
		    content:`<div id="list${id}"></div>`,
		    onOpen:function(){
		    	onOpenNovoCarrinho(id)
		    }
		});	
		$(`#tab${id}`).layout('add',{//Gera Conteudo de Carrinhos
		    width: 200,
		    title: 'Pagamento',
		    region: 'east',
		    border:0,
		    bodyCls:'blockProdutos pdg5',
		    content:`<span>Valor Total:</span>
		    	<input id="valorTotal${id}" name="total" >
		    	<span>Valor Pago:</span>
		    	<input id="valorPago${id}" name="pago" >
		    	<span>Valor Troco:</span>
		    	<input id="valorTroco${id}" name="troco" >
		    	<span>Cliente:</span>
		    	<input name="cliente" >
		    	<span>Detalhes:</span>
		    	<input name="detalhe" >`
		});	
	}
	
	onOpenNovoCarrinho(id){
		
		this.carrinho['tabId'+id] = new carrinhoEasyui({
		    border:0,
		    singleSelect:true,
		    fitColumns:true,
		    pagination:true,
		    fit:true,
		    pageSize:20,
			elemento:`#list${id}`,
			columns:[this.columns],
			onSet:function(row,object){
				$(`#valorTotal${id}`).val(object.valorTotal)
				$(`#valorPago${id}`).val(object.valorPago)
				$(`#valorTroco${id}`).val(object.valorTroco)
			}
		});	
	}

	addAba(id){
		let onOpenNovaAba = (id) => {this.onOpenNovaAba(id)}
		$(this.element).tabs('add',{
			title:`Venda ${id}`,
			closable:true,
			id:`tabId${id}`,
			content:`<div id="tab${id}"></div>`,
			onOpen:function(){
				onOpenNovaAba(id);		
			}
		});	
	}

	insertItem(value){
		//if(!value) value = this.itemSelected[this.getSelected()];		
		this.carrinho[this.getSelected()].insertItem({
			data:value,
		});
		let vals = Object.assign({}, value);
		delete vals.qnt;
		this.itemSelected = vals;
	}

}