$( document ).ready(function() {

	$('body').html('<div id="panelBody">teste</div>');

	const home = new Tabs('#panelBody');
	
	home.addMenu({
		iconCls:'icon-save',
		handler:function(){
			alert('save')
		}
	});

	home.addMenu({
		iconCls:'icon-add',
		handler:function(){
			alert('add')
		}
	});

	home.addContent({
	    title:'Pdv',
	    href:'modulos/pdv/index.html'
	});


});

