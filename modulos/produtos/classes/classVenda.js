class Vendas extends classPadrao{
	constructor(parans={}){
		super(parans);

		//---------------------------------------------------------------------//
		this.terminal = parans.terminal;
		this.usuario = parans.usuario;
		this.carrihos = {};

		//Execulda Mewtdos de Entrada
		//---------------------------------------------------------------------//
		this.onCreate(Object.assign(this, parans));		
	}

}