class CiudadDefinition {
    constructor(resultsContainer, CiudadDefinition) {
        const wordDisplay = resultsContainer.querySelector('#word');
        const defDisplay = resultsContainer.querySelector('#definition');
        wordDisplay.textContent = CiudadDefinition.word;
        defDisplay.textContent = CiudadDefinition.definition;
    }
}

export default CiudadDefinition;