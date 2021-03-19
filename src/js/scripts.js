/**
 * resultado aproximado de uma circunferência de diâmetro igual a 20.000
 *
 * @type {number}
 */
export const PI = Math.PI // 3.141592653589793

/**
 * recebe por parâmetro uma quantidade indefinida de números e efetua a soma dos
 * mesmos.
 *
 * @param {number[]} params
 * @returns {number} valor soma dos parâmetros
 */
export function soma (...params) {
 return params.reduce((a, b) => a + b, 0)
}


///////////////////////////////////////////////////
///////// Propriedades
///////////////////////////////////////////////////
export const servidor = {
	url:'http://localhost/vendasOnline/',
	versao: '1.0'
}

///////////////////////////////////////////////////
///////// Metodos
///////////////////////////////////////////////////
/*
$( document ).ready(function(){
	var layout={
			head:{},
			body:{
				header:{},
				nav:{},
				section:{
					header:{},
					article:{},
					footer:{},
				},
				aside:{},
				footer:{}
			}
		}
});
*/