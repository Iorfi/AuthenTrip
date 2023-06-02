import express from 'express';
import db from './db.js';

////////////////////////////////////////////////////////////////////////////////
class DictionaryBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));

    app.get('/lookup/:word', this._doLookup);
    app.post('/save/', this._doSave);
    app.delete('/delete/', this._doDelete);

    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async _doLookup(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const query = { word: word.toLowerCase() };
    const collection = db.collection("coments");
    const stored = await collection.findOne(query);
    const response = {
      word: word,
      definition: stored ? stored.definition : ''
    };
    res.json(response);
  }

  async _doDelete(req, res) {
    const query = { word: req.body.word.toLowerCase() };
    const collection = db.collection("coments");
    const deleted = await collection.findOneAndDelete(query);
    res.json(deleted.value);
  }


  async _doSave(req, res) {
    const query = { word: req.body.word.toLowerCase() };
    const update = { $set: { definition: req.body.definition } };
    const params = { upsert: true };
    const collection = db.collection("coments");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }

 }

new DictionaryBackendServer();
