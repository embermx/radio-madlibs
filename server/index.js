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
app.get('/phrases/:phrase_id', function(req, res) {
  var id = req.params.phrase_id;
  if (!id) {
    res.status(422).json({message: 'must provide an id'});
  }

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT words FROM radiomadlib_phrases WHERE id = $1', [id], function(err, result) {
      done();
      if (err) {
        res.status(500).json({message: "that's an error", error: err});
        return console.error('error running query', err);
      }
      res.json({id: id, words: result.rows});
    });
  });
});

app.post('/phrases', function(req, res) {
  var phrase = req.body.phrase,
    words = phrase ? phrase.words : false;

  if (!words || !words.length) {
    res.status(422).json({message: 'words required'});
    return;
  }

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var wordIds = words.join(','),
      query = "INSERT INTO radiomadlib_phrases (words) VALUES ('{" + wordIds + "}') RETURNING id";

    client.query(query, function(err, results) {
      done();
      if (err) {
        res.status(500).json({message: "that's an error", erro: err});
        return console.error('error running query', err);
      }
      res.json(results);
    });
  });
});

app.listen(process.env.PORT || 3000);
