class classPadrao{
	constructor(params={}){

		this.selected = '';
		this.list = {}

		//Eventos
		//---------------------------------------------------------------------//
		this.onCreate = params.onCreate ? (parms1) => params.onCreate(parms1) : ()=>{} ;;
		this.onSet = params.onSet ? (parms1) => params.onSet(parms1) : ()=>{} ;
		this.onAdd = params.onAdd ? (parms1,parms2) => params.onAdd(parms1,parms2) : ()=>{} ;
		this.onDel = params.onDel ? (parms1,parms2) => params.onDel(parms1,parms2) : ()=>{} ;
		this.onSelect = params.onSelect ? (parms1,parms2) => params.onSelect(parms1,parms2) : ()=>{} ;

	}
	get(id){
		return this.list[id];
	}
	set(param={}){	
		if(!param.id)param.id = this.codId();	
		this.list[param.id] = param;
		this.onSet(param,this.list);
		if(param.selected)this.select(param.id);
	}
	list(){
		return this.list
	}
	del(id){
		delete this.list[id];
		this.onDel(id,this.list);
	}
	select(id){
		this.selected = id;
		this.onSelect(id,this.list[id]);
	}
	codId(){
		var date  = new Date();
		return Math.round(date.getTime()/1000 | 0)+String(Math.floor(Math.random() * (1000 + 9999)));; 
	}	
}