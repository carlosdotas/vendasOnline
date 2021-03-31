class Observers {	
	constructor() {
		this.observers = [];
	}
	add(objeto) {
		this.observers.push(objeto);		
	}
	del(objeto) {
	  var index = this.observers.indexOf(objeto);
	  if (index > -1) {
	    this.observers.splice(index, 1);
	  }		
	}	
	notify(){
		for(let objeto of this.observers) {
			objeto(this);
		}
	}	
}
