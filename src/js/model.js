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
		document.title = value;
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
	addStyles(value){
		value.forEach(function(file){
			var sc = document.createElement("link");
			sc.setAttribute("rel", 'stylesheet');
			sc.setAttribute("href", file);
			document.head.appendChild(sc);
		})
	}

	setJavascripts(value){
		var contents = '';
		value.forEach(function(file){
			contents += `<script type="text/javascript" src="${file}"></script>`;
		})
		this.javascripts = contents;	
	}
	addJavascripts(value){
		value.forEach(function(file){
			var sc = document.createElement("script");
			sc.setAttribute("src", file);
			document.head.appendChild(sc);
		})
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
		this.setBody('');
		this.setHead(`<head>${this.metas}${this.javascripts}${this.styles}</head>`);
		this.setHtml(`<!DOCTYPE html><html>${this.head}<body>${this.body}${this.script}</body></html>`);		
		document.write(this.html);
	}
}