import express from 'express';
import passport from 'passport';
import db from './db.js';
import Authorization from "./auth.js"

////////////////////////////////////////////////////////////////////////////////
class DictionaryBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    const authorization = new Authorization(app);

    app.get('/lookup/:word', this._doLookup);
    app.post('/save/', this._doSave);
    app.delete('/delete/', this._doDelete);
    app.get('/login/', this._login);
    app.get('/', authorization.checkAuthenticated, this._goHome);
    app.get("/countries", (req, res) => {
      fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
        .then(data => {
          res.json(data);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error: "Ocurrió un error al obtener los países" });
        });
    });

    app.get('/auth/google/', passport.authenticate('google', {
      scope: ['email', 'profile']
    }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

   app.post("/logout", (req,res) => {
    req.logOut(err=>console.log(err));
    res.redirect("/login");
 })

    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
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
