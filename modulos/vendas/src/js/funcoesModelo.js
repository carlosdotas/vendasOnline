///////////////////////////////////////////////////
///////// Metodos
///////////////////////////////////////////////////
const functionModelo = (data) =>{	

	///////// Parametros
	let object = {
		nome:'',
		telefone:'125456'
	};

	///////// Sets Parametros
	Object.assign(object, data);

	///////// Eventos
	var onSet = (value)=>{return data.onSet ? data.onSet(value) : 0;};

	///////// Metodos
	object.setNome = (dataIn)=>{object.nome=dataIn; onSet(object);return object;}

	return object;
}

var modelo = functionModelo({
	nome:'Breno',
	//telefone:'629961573',
	//onSet:(valoe)=>{console.log(valoe);}
});

 modelo.setNome('pedro');

console.log(modelo);
//console.log(saida);

//console.log(modelo);
