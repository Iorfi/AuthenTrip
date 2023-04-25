class Dictionary {

    doLookup(word) {
      return fetch('/lookup/' + word)
        .then(response => response.json());
    }
  }

  export default Dictionary;