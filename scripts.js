//Loaddings
/*-----------------------------------------------------------------*/
$( document ).ready(function() {
	$( document ).ajaxStart(function() {
	  	$.messager.progress();
	});
	$(document).ajaxSuccess(function() {
	 	$.messager.progress('close');
	});
	$( document ).ajaxError(function(y,x,r) {	
		$.messager.alert(`${y.type}`,`${y.type}!<br>Type:${r.type}<br>URL:${r.url}`,'info');
		$.messager.progress('close');
	});
});