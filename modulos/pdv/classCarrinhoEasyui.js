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

		this.calTotal();		

		this.onSet(params.data,this);
	}
}


	