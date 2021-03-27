$( document ).ready(function() {
	$('#secttionTab').tabs({
		border:0,
		fit:true,
		plain:true,
		tools:[{
			iconCls:'icon-add',
			handler:function(){
				alert('add')
			}
		},{
			iconCls:'icon-save',
			handler:function(){
				alert('save')
			}
		}]
	});

	$('#secttionTab').tabs('add',{
	    title:'Venda',
	    href:"modulos/vendas/index.html",
	    closable:true,
	    tools:[{
	        iconCls:'icon-mini-refresh',
	        handler:function(){
	            alert('refresh');
	        }
	    }]
	});
});

