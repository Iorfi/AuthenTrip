class CiudadSetDefinition {
    constructor(resultsContainer) {
      this.setWordInput = resultsContainer.querySelector('#set-word-input');
      this.setDefInput = resultsContainer.querySelector('#set-def-input');      
    }

    show(Definition) {
      this.setWordInput.value = Definition.word;
      this.setDefInput.value = Definition.definition;
    }

    read() {
      const result = {
        word: this.setWordInput.value,
        definition: this.setDefInput.value
      };
      return result;
    }
}

export default CiudadSetDefinition;
