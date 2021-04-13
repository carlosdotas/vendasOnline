//Cria Tabs de  Carrinhos
//----------------------------------------------------------//
class tabsCarrinhosEasyui{	
	constructor(params){
		this.element  = params.element;
		this.carrinho = {};
		this.columns  = params.columns;
		this.selected = 0;
		this.itemSelected = {};
		this.datagridSelected = '';
		this.rowSelected = '';
		this.criaTab(this.element);
	}

	getSelected(){
		return this.selected
	}

	getDatagridSelected(){
		return this.datagridSelected
	}
	setDatagridSelected(id){
		this.datagridSelected = id;
	}

	getItemSelected(){
		return this.itemSelected
	}
	setItemSelected(value){
		this.itemSelected = value;
	}

	criaTab(){
		let select = (select)=>{ this.selected = select}
		let setDatagridSelected = (id) => {this.setDatagridSelected(`datagrid${id}`)}
		let element = this.element;
		$(this.element).tabs({
			fit:true,
		 	onSelect:function(title,id){
		 		let selected = $(element).tabs('getSelected').attr('id');		 		
		 		select(selected);
		 		setDatagridSelected(selected);
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
		let datagrid = 'datagrid'+id;
		let onSelect = (id) => {this.setItemSelected(id)}
		this.carrinho[datagrid] = new carrinhoEasyui({
		    border:0,
		    singleSelect:true,
		    fitColumns:true,
		    pagination:true,
		    fit:true,
		    pageSize:20,
			elemento:`#list${id}`,
			columns:[this.columns],
			onOpen:function(){
				
			},
			onSelect:function(index,row){
				onSelect(row);
			},
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
			id:`${id}`,
			content:`<div id="tab${id}"></div>`,
			onOpen:function(){
				onOpenNovaAba(id);		
			}
		});	
	}

	insertItem(value){
		//if(!value) value = this.itemSelected[this.getSelected()];		
		this.carrinho[this.getDatagridSelected()].insertItem({
			data:value,
		});
		let vals = Object.assign({}, value);
		delete vals.qnt;
		this.itemSelected = vals;

	}

	removeItem(value){
		//if(!value) value = this.itemSelected[this.getSelected()];	
		let vals = Object.assign({}, value);
		vals.qnt = 1;

		this.carrinho[this.getDatagridSelected()].removeItem({
			data:vals,
		});

	}

	delItem(value){
		//if(!value) value = this.itemSelected[this.getSelected()];	
		this.carrinho[this.getDatagridSelected()].delItem({
			data:value,
		});

	}
	selectRow(index){

	}
}


//Class Carrinho Easyui
//----------------------------------------------------------//
class carrinhoEasyui{
	constructor(params={}){

		/* Eventos
		/*-----------------------------------------*/
		this.onSet = params.onSet ? (values,values2,values3) => params.onSet(values,values2,values3) : ()=>{} ;

		/* Parampetro
		/*-----------------------------------------*/
		this.elemento = params.elemento;
		this.itens = [];
		this.valorTotal = 0;
		this.valorPago = 0;
		this.valorTroco = 0;
		this.rowSelected = 0;

		/* Regras
		/*-----------------------------------------*/
		let paramsDataGrid = Object.assign({fit:true}, params);

		/* Execucoes
		/*-----------------------------------------*/
		$(this.elemento).datagrid(paramsDataGrid);	
	}
	forEachRows(funcao){
		let getRows = $(this.elemento).datagrid('getRows');
		getRows.forEach(function(vals,index){
			funcao(vals,index)
		});	
		return getRows;
	}
	calTotal(){

		let valorTotal = 0;
		let valorPago = 0;

		this.forEachRows(function(vals,index){
			if(vals.total>=0){
				valorTotal = (valorTotal-0)+(vals.total-0);
			}else{
				valorPago = (valorPago-0)+(-(vals.total-0));
			}			
		})

		this.valorTotal = (valorTotal-0).toFixed(2);
		this.valorPago = (valorPago-0).toFixed(2);
		this.valorTroco = (valorPago-valorTotal).toFixed(2);	

	}
	delItem(params){
		let elemento = this.elemento;
		this.forEachRows(function(vals,index){
			if(vals.cod==params.data.cod){
				$(elemento).datagrid('deleteRow',index);				
			}		
		})
		this.calTotal();		
		this.onSet(params.data,this);		
	}
	removeItem(params){
		let elemento = this.elemento;

		this.forEachRows(function(vals,index){
			if(vals.cod==params.data.cod){

				if(vals.qnt<=1)return false;

				$(elemento).datagrid('deleteRow',index);				
				params.data.qnt = (vals.qnt-0)-(params.data.qnt-0);

				//params.data.qnt = (params.data.qnt-0).toFixed(3);
				params.data.total = ((params.data.preco-0)*(params.data.qnt-0)).toFixed(2);

				$(elemento).datagrid('insertRow',{
					index: 0,	
					row: params.data
				});

			}	
		})	

		this.calTotal();		
		this.onSet(params.data,this);	

	}
	getRowSelected(){		
		return this.rowSelected;		
	}	
	setRowSelected(index){		
		this.rowSelected = index;
		$(this.elemento).datagrid('selectRow',index);
	}
	insertItem(params){

		let elemento = this.elemento;

		if(!params.data.qnt) params.data.qnt = 1;

		this.forEachRows(function(vals,index){

			if(vals.cod==params.data.cod){				
				$(elemento).datagrid('deleteRow',index);				
				params.data.qnt = (params.data.qnt-0)+(vals.qnt-0);
			}
		});		

		
		params.data.total = ((params.data.preco-0)*(params.data.qnt-0)).toFixed(2);


		$(elemento).datagrid('insertRow',{
			index: 0,	
			row: params.data
		});

		this.setRowSelected(0);

		this.calTotal();		

		this.onSet(params.data,this);
	}
}


	