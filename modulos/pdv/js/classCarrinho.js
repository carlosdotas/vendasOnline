class Carrinho extends Observers{
	constructor(){
		super();
		let id = getCodTimer();
		this.id=getCodTimer()
		this.title='Carrinho:'+id
		this.dataIn=0
		this.dataFim=0
		this.client=0
		this.informacoes=''
		this.valortotal=0
		this.valorpago=0
		this.valortroco=0
		this.pagamentos=[]
		this.produtos=[]
	}
	addProduto(id){
		//if(!id)id=getCodTimer();
		//this.selected = {

		//}		
		//this.vendas.push(this.selected);	
			
	}
	addProduto(id){
		//delete this.vendas[id];
	}
	selecProduto(id){
		//this.selected = this.vendas[id];
	}
}