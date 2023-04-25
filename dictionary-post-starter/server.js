import express from 'express';

////////////////////////////////////////////////////////////////////////////////
class DictionaryBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));

    app.get('/lookup/:word', this._doLookup);

    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async _doLookup(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    
    const response = {
      word: word,
      definition: 'Not found'
    };
    res.json(response);
  }
}

new DictionaryBackendServer();
