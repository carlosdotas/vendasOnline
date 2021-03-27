$( document ).ready(function() {
	const pdv = new Layout('#pdv');
	pdv.setLayout();
	pdv.addContent({
	    region: 'north',
	    content:'asd',
	    height : 5
	});
	pdv.addContent({
	    region: 'south',
	    height:30,
	});
	pdv.addContent({
	    region: 'west',
	    width: 280,
	    border:1
	});		
	pdv.addContent({
	    region: 'center',
	});	
	pdv.addContent({
	    region: 'east',
	    width: 200,
	});		
});

