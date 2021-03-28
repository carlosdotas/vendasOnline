class Vendas extends Observers{
	constructor(){
		super();
		this.carrinhos = [];
		this.selected = {};	
	}
	add(id){
		if(!id)id=getCodTimer();
		this.selected = {
			id:id,
			dataIn:0,
			dataFim:0,
			client:0,
			informacoes:'',
			valortotal:0,
			valorpago:0,
			valortroco:0,
			pagamentos:[],
			carrinho:[],
		}		
		this.carrinhos.push(this.selected);	
		this.notifyObservers();	
	}
	del(id){
		delete this.carrinhos[id];
	}
	selec(id){
		this.selected = this.carrinhos[id];
	}
}