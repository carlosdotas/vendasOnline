class Home{
	constructor(){
		this.body = {}
		this.menu = []
		this.tabs = {}
	}
	setBody(){
		$('body').html('<div id="panelBody"></div>');
		$('#panelBody').panel({
			border:0,
			fit:true,
		    content:'<div id="secttionTab"></div>',
		});			
		$('#secttionTab').tabs({
			border:0,
			selected:0,
			fit:true,
			plain:true
		});		
	}
	addMenu(menu){
		this.menu.push(menu);
		this.setMenu(this.menu);
	}	
	setMenu(tools){
		$('#secttionTab').tabs({
			tools:tools
		});	
	}
	addTabs(tabs){
		$('#secttionTab').tabs('add',tabs);
	}		
	update(){

		this.setBody();
		this.setMenu();
		this.setTabs();

	}

}