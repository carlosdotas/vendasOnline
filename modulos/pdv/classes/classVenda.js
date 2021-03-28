class Vendas extends Observers{
	constructor(){
		super();
		this.carrinhos = [];
		this.selected = {};	
	}
	set(id){

	}
	del(id){
		//delete this.carrinhos[id];
	}
	get(id){
		//this.selected = this.carrinhos[id];
	}
}