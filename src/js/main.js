const pagina = new Pagina;

pagina.setTitle('Sistema de Vendas');

pagina.setStyles([
	'extension/jquery-easyui/themes/bootstrap/easyui.css',
	'extension/jquery-easyui/themes/icon.css',
	'extension/bootstrap-4.0.0/dist/css/bootstrap.min.css',
	'src/css/style.css',
	])

pagina.setMetas([
	'<meta http-equiv="Content-Language" content="pt-br">',	
	'<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">',
	])

pagina.setJavascripts([
	'src/js/jquery.min.js',
	'extension/jquery-easyui/jquery.easyui.min.js',
	'extension/jquery-easyui/locale/easyui-lang-pt_BR.js',
	'extension/jquery.maskMoney.min.js',
	'src/js/classes.js',
	'src/js/funcoes.js',
	'src/js/jquery.funcoes.js',
	'modulos/home/index.js',
]);  

pagina.update();