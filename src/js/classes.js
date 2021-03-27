class Layout{
	constructor(element){
		this.element = element
	}
	setLayout(value){
		$(this.element).html('');
		$(this.element).layout({
			fit:true,
		});
	}
	addContent(params){		
		let saida = Object.assign({
			border:0,			
			split: false
		},params);
		$(this.element).layout('add',saida);
	}
}

class Tabs{
	constructor(element){
		this.element = element;
		this.menu = [];

		$(this.element).html('');
		$(this.element).tabs({
			fit:true,
			plain:true
		});		
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
}