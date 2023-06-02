import Dictionary from "./dictionary.js";
import CiudadDefinition from "./ciudadDefinition.js";
import CiudadSetDefinition from "./ciudadSetDefinition.js";

class App {
  constructor() {
    this.dictionary = new Dictionary();

    const searchForm = document.querySelector('#search');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);

    const deleteForm = document.querySelector('#delete');
    this._onDelete = this._onDelete.bind(this);
    deleteForm.addEventListener('submit', this._onDelete);
    
    const setForm = document.querySelector('#set');
    this._onSet = this._onSet.bind(this);
    setForm.addEventListener('submit', this._onSet);
  }
  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const ciudadSetDefinition = new CiudadSetDefinition(resultsContainer);
    const postBody = ciudadSetDefinition.read();

    const status = results.querySelector('#status');
    status.textContent = '';

    this.dictionary.save(postBody)
      .then(result => {
        // Update definition
        new CiudadDefinition(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });

  }

  _onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    console.log("Aca A") 
    const input = document.querySelector('#ciudad-input');
    const word = input.value.trim();
    console.log("Aca B") 
    this.dictionary.doLookup(word)  
    console.log("llego") 
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show Word Definition.
    new CiudadDefinition(resultsContainer, result);

    // Prep set definition form.
    const ciudadSetDefinition = new CiudadSetDefinition(resultsContainer);
    ciudadSetDefinition.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
const app = new App();
