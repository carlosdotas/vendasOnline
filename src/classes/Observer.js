class Observers {	
	constructor() {
		this.observers = [];
	}
	addObserver(objeto) {
		this.observers.push(objeto);		
	}
	delObserver(objeto) {
	  var index = this.observers.indexOf(objeto);
	  if (index > -1) {
	    this.observers.splice(index, 1);
	  }		
	}	
	notifyObservers(){		
		
		console.log(this.observers);

		for(let objeto of this.observers) {
			objeto.update(this);
		}
	}	
}
