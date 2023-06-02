class CiudadDefinition {
    constructor(resultsContainer, CiudadDefinition) {
        const wordDisplay = resultsContainer.querySelector('#word');
        const defDisplay = resultsContainer.querySelector('#definition');
        wordDisplay.textContent = wordDefinition.word;
        defDisplay.textContent = wordDefinition.definition;
    }
}

export default WordDefinition;