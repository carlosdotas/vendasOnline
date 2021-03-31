class Layout{
	constructor(params){
		//north,south,west,center,east
		this.element = params.element;
		this.rendezar(params);
	}
	addContent(params){		
		let saida = Object.assign({
			border:0,			
			split: false
		},params);
		$(this.element).layout('add',saida);
	}
	rendezar(paramsIn){		
		///////// Sets Parametros
		//////////////////////////////////////////////////////////////////
		let params = Object.assign({
			fit:true
		}, paramsIn);
		//////////////////////////////////////////////////////////////////
		$(this.element).layout(params);			
	}
	update(params){
		addContent(params);
	}
}

class Tabs{
	constructor(params){
		this.element = params.element;
		this.menu = [];
		this.rendezar(params);
	}
	addMenu(menu){
		this.menu.push(menu);
		$(this.element).tabs({
			tools:this.menu
		});	
	}
	addContent(params){		
		let saida = Object.assign({
			border:0
		},params);
		$(this.element).tabs('add',saida);
	}
	rendezar(paramsIn){
		
		///////// Sets Parametros
		//////////////////////////////////////////////////////////////////
		let params = Object.assign({
			fit:true,
			plain:true
		}, paramsIn);
		
		//////////////////////////////////////////////////////////////////
		$(this.element).tabs(params);		
	}
	update(params){
		this.addContent(params);
	}	
}