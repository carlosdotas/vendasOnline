///////////////////////////////////////////////////
///////// Parametros
///////////////////////////////////////////////////

///////////////////////////////////////////////////
///////// Metodos
///////////////////////////////////////////////////
$( document ).ready(function(){

var criaCarrinhoDeCompras = lista({
	onSet:(value)=>{
		console.log(criaCarrinhoDeCompras);
	}
});
criaCarrinhoDeCompras.add({
	codigo:'345675',
	nome:"Carteira",
	preco:2.5,
})
criaCarrinhoDeCompras.add({
	codigo:'1254521',
	nome:"Macarrao",
	preco:2.5,
	qnt:1,
})
criaCarrinhoDeCompras.add({
	codigo:'2324553',
	nome:"Banana",
	preco:7.85,
	qnt:1.3,
})
criaCarrinhoDeCompras.add({
	codigo:'345646',
	nome:"Pera",
	preco:9.50,
	qnt:2.5,
})
criaCarrinhoDeCompras.add({
	codigo:'2324553',
	nome:"Banana",
	preco:7.85,
	qnt:2.4,
})
criaCarrinhoDeCompras.add({
	codigo:'2324553',
	nome:"Banana",
	preco:7.85,
	qnt:1,
})
criaCarrinhoDeCompras.remove('2324553',2);
criaCarrinhoDeCompras.del('345646');
criaCarrinhoDeCompras.edit({
	codigo:'1254521',
	nome:"Macarrao2",
	preco:3,
	qnt:8,
});

})