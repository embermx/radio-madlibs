var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  pg = require('pg'),
  app = express(),
  connectionString = process.env.DATABASE_URL,
  table = 'radiomadlib_phrases';

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/:phrase_id', function(req, res) {
  var id = req.params.phrase_id;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT words FROM $1 WHERE id = $2', [table, id], function(err, result) {
      done();
      if (err) {
        res.status(500).json(err);
        return console.error('error running query', err);
      }
      res.json({id: id, words: result});
    });
  });
});

app.post('/', function(req, res) {
  var body = req.body,
    words;

  if (!words || !words.length) {
    res.status(422).json({error: 'words required'});
    return;
  }

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO $1 VALUES ("{$2})") RETURNING id', [table, words], function(err, results) {
      done();
      if (err) {
        res.status(500).json(err);
        return console.error('error running query', err);
      }
    });
  });
});

app.listen(process.env.PORT || 3000);
