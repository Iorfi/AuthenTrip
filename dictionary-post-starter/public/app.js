import Dictionary from "./dictionary.js";
import WordDefinition from "./wordDefinition.js";
import WordSetDefinition from "./wordSetDefinition.js";

class App {
  constructor() {
    this.dictionary = new Dictionary();

    const searchForm = document.querySelector('#search');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);
  }

  _onSearch(event) {
    event.preventDefault();
    const input = document.querySelector('#word-input');
    const word = input.value.trim();
    this.dictionary.doLookup(word)
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show Word Definition.
    new WordDefinition(resultsContainer, result);

    // Prep set definition form.
    const wordSet = new WordSetDefinition(resultsContainer);
    wordSet.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
const app = new App();
