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
	}
	setCarrinho(params){
		this.list[this.selected].produtos.push(params);
	}	
	getCarrinho(idVenda=false){
		if(!idVenda)idVenda=this.selected;
		return this.list[idVenda].produtos;
	}	

}