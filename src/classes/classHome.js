class Home extends classPadrao{
	constructor(params={}){

		super(params);
		//this.window.title = params.title ;
		this.plain = true ;		
		this.fit = true ;
		this.tools = []

		//Eventos
		//---------------------------------------------------------------------//
		this.onRender = params.onRender ? (parms1) => params.onRender(parms1) : ()=>{} ;

		//Execulda Mewtdos de Entrada
		//---------------------------------------------------------------------//
		this.onCreate(this);

	}
	setTitle(value){
		this.title = value;
		document.title = value;
	}
	addTools(value){
		this.tools.push(value);
	}
	addStyles(value){
		value.forEach(function(file){
			var sc = document.createElement("link");
			sc.setAttribute("rel", 'stylesheet');
			sc.setAttribute("href", file);
			document.head.appendChild(sc);
		})
	}
	render(){
		this.onRender(this);
	}
	addJavascripts(value){
		value.forEach(function(file){
			$.ajax({
			  url: file,
			  async: false,
			  dataType: "script",
			});
		})
	}
}