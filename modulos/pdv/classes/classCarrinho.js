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
		this.produtos=[]

		//Execulda Mewtdos de Entrada
		//---------------------------------------------------------------------//
		this.onCreate(Object.assign(this, parans));		
	}
	codId(){
		var date  = new Date();
		return Math.round(date.getTime()/1000 | 0)+String(Math.floor(Math.random() * (1000 + 9999)));; 
	}	
}