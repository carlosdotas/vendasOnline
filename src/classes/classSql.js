class Sql{
	constructor(params){

		this.db = openDatabase(params.dbName, '1.0', params.dbName, 2 * 1024 * 1024);

		/* Eventos
		/*-----------------------------------------*/
		this.onExec = params.onExec ? (values) => params.onExec(values) : ()=>{} ;
		this.onRead = params.onRead ? (values) => params.onRead(values) : ()=>{} ;

	}
	exec(command,funcao=()=>{}){

		let onExec = this.onExec;		

		this.db.transaction(function (tx) {		   
		   	tx.executeSql(command, [], function (tx, results) {
				funcao(results);
				onExec(results);
	   		}, null);		
		});		
	}
	insert(params){

		/* Parampetro
		/*-----------------------------------------*/
		let cols = [];
		let vals = [];
		
		/* Regras
		/*-----------------------------------------*/
		Object.entries(params.values).forEach(function(name){
			cols.push(name[0]);
			vals.push(name[1]);			
		});		

		cols = cols.join(', ');
		vals = '"'+vals.join('", "')+'"';
	
		/* Execuções
		/*-----------------------------------------*/
		this.exec(`CREATE TABLE IF NOT EXISTS ${params.table} (${cols})`);
	   	this.exec(`INSERT INTO ${params.table} (${cols}) VALUES (${vals})`,params.onInsert);

	}
	update(params){

		/* Regras
		/*-----------------------------------------*/
		let vals = [];
		Object.entries(params.values).forEach(function(name){
			vals.push(name[0]+"='"+name[1]+"'");			
		});	
		vals = vals.join(',');	

		/* Execuções
		/*-----------------------------------------*/			
	    this.exec(`UPDATE ${params.table} SET ${vals} WHERE rowid=${params.id}`,params.onUpdate);
	}		
	read(params){	

		/* Regras
		/*-----------------------------------------*/
		let where = '';
		/*-----------------------------------------*/
		if(params.id) where = `WHERE rowid='${params.id}'`;
		/*-----------------------------------------*/
		if(params.filtro) {
			let filtro = [];
			Object.entries(params.filtro).forEach(function(name){
				filtro.push(name[0]+"='"+name[1]+"'");			
			});		
			filtro = filtro.join(',');
			where = `WHERE ${filtro}`;		
		}

		/* Execuções
		/*-----------------------------------------*/
	   	this.exec(`SELECT rowid,* FROM ${params.table} ${where}`, params.onRead);
	}	
	del(params){
		/* Execuções
		/*-----------------------------------------*/
		this.exec(`DELETE FROM ${params.table}  WHERE rowid=${params.id}`,params.onDel);
	}	
	delTable(params){		
		this.exec(`DROP TABLE ${params.table}`,params.onDelTable);
	}	
}

/*
const db = new Sql({
	dbName:'Vendas',
	onRead:function(values){
		console.log(values);
	}
});

db.delTable({
	table:'produtos',
	onDelTable:function(value){
		console.log(value);
	}
});

db.insert({
	table:'produtos',
	values:{cod:'21',name:'Gelatina',preco:25.90},
	onInsert:function(value){
		console.log(value);
	}
});

db.update({
	table:'produtos',
	id:5,
	values:{cod:'25',name:'Gelatina2',preco:25.90},
	onUpdate:function(value){
		console.log(value);
	}	
});

db.read({
	table:'produtos',
	//id:10,
	//filtro:{cod:21},
	onRead:function(value){
		console.log(value);
	}
});

db.del({
	table:'produtos',
	id:4,
	onDel:function(value){
		console.log(value);
	}	
});
*/