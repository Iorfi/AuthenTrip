import Fetch from "./fetch.js";
import CiudadDefinition from "./ciudadDefinition.js";
import CiudadSetDefinition from "./ciudadSetDefinition.js";

document.addEventListener('DOMContentLoaded', function() {
  fetch('https://restcountries.com/v3/all')
    .then(response => response.json())
    .then(data => {
      const countrySelect = document.getElementById('country-select');
      data.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.text = country.name.common;
        countrySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.log('Error al obtener los países:', error);
    });
});


class App {
  constructor() {
    this.fetch = new Fetch();

    const comenzar = document.querySelector('#start-button');
    this._juego = this._juego.bind(this);
    comenzar.addEventListener('submit', this._juego);

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
  _juego(event) {    
    event.preventDefault();

    fetch('https://opentdb.com/api.php?amount=2&category=22&difficulty=medium&type=multiple')
  .then(response => response.json())
    .then(data => {
      const triviaContainer = document.getElementById('trivia-questions');
      triviaContainer.innerHTML = ''; // Limpiar las preguntas anteriores
      data.results.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
          <h2>${question.question}</h2>
          <ul class="options">
            ${question.incorrect_answers.map(option => `<li><button>${option}</button></li>`).join('')}
            <li><button>${question.correct_answer}</button></li>
          </ul>
        `;
        triviaContainer.appendChild(questionElement);
      });

      const buttons = document.querySelectorAll('.options button');
      buttons.forEach(button => {
        button.addEventListener('click', (event) => {
          const selectedOption = event.target.textContent;
          const correctAnswer = event.target.parentNode.parentNode.querySelector('li:last-child button').textContent;
          if (selectedOption === correctAnswer) {
            alert('¡Correcto!');
          } else {
            alert('Incorrecto. La respuesta correcta es: ' + correctAnswer);
          }
        });
      });
    })
    .catch(error => console.error('Error:', error));


    };
  
  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const ciudadSetDefinition = new CiudadSetDefinition(resultsContainer);
    const postBody = ciudadSetDefinition.read();

    const status = results.querySelector('#status');
    status.textContent = '';

    this.fetch.save(postBody)
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
    const input = document.querySelector('#country-select');
    const word = input.value.trim();
    this.fetch.doLookup(word)  
      .then(this._showResults);
  }

  _onDelete(event) {
    event.preventDefault();
    const input = document.querySelector('#word-input-delete');
    const word = input.value.trim();
    this.fetch.delete(word) 
        .then (response => response.json())
        .then (value => {
          const deleteStatus = document.querySelector('#delete-status');
            if (value === null) deleteStatus.textContent = "Word Not Found!";
              else deleteStatus.textContent = "Word Deleted!";
        });
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



