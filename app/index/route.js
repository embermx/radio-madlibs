import Ember from 'ember';

const {
  Route,
  inject,
  get,
  computed,
  RSVP
} = Ember;

export default Route.extend({
  audio: inject.service(),
  audioQueue: computed('audio.queue'),

  model() {
    const store = get(this, 'store');
    const fixtures = get(this, 'files');

    return RSVP.hash({
      availableAudio: fixtures.map(f => store.createRecord('word', f)),
      phrase: store.createRecord('phrase')
     });
  },


  actions: {
    addToQueue(model /*, ops*/) {
      const audio = get(this, 'audio');
      const modelProps = model.getProperties('id', 'url');
      audio.addToQueue(modelProps);
      this._addToChosenPhrases(model);
    },
    removeWord(word) {
      this._removeWordFromModel(word);
      this._removeWordFromQueue(word);
    }
  },

  _addToChosenPhrases(obj) {
    const words = get(this, 'currentModel.phrase.words');
    words.pushObject(obj);
  },
  _removeWordFromModel(word) {
    const words = get(this, 'currentModel.phrase.words');
    words.removeObject(word);
  },
  _removeWordFromQueue(word) {
    const audio = get(this, 'audio');
    audio.removeFromQueue(word);
  }
});
