class Pagina{
	constructor(){
		this.html = '';
		this.head = '';
		this.title = '';
		this.metas = '';
		this.styles = '';
		this.javascripts = '';
		this.style = '';
		this.script = '';
		this.body = '';
		
	}
	setTitle(value){
		this.title = value;
	}
	setHead(value){
		this.head = value;
	}	
	setMetas(value){
		this.metas = value.join('');
	}
	setStyles(value){
		var content = '';
		value.forEach(function(file){
			content += `<link rel="stylesheet" href="${file}">`;
		})
		this.styles = content;	
	}
	setJavascripts(value){
		var contents = '';
		value.forEach(function(file){
			contents += `<script type="text/javascript" src="${file}"></script>`;
		})
		this.javascripts = contents;	
	}
	setBody(value){
		this.body = value;
	}
	setStyle(value){
		this.style = `<style type="text/css">${value}</style>`;
	}	
	setScript(value){
		this.script = `<script type="text/javascript">${value}</script>`;
	}		
	setHtml(value){
		this.html = value
	}
	update(){
		document.write(this.html);
	}
}