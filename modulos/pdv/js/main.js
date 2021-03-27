$( document ).ready(function() {

	const pdv = new Layout('#pdv');

	pdv.addContent({
	    region: 'north',
	    bodyCls:'gradiente1'
	});	
	pdv.addContent({
	    region: 'center',
	    bodyCls:'sombra_Interna_foot pdg5',
	    content:'Centro'
	});	
});

