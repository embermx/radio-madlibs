import Ember from 'ember';

const {
  Mixin,
  inject,
  computed,
  get
} = Ember;

export default Mixin.create({
  audio: inject.service(),
  audioQueue: computed('audio.queue'),

  actions: {
    addToQueue(model /*, ops*/) {
      const audio = get(this, 'audio');
      audio.addToQueue(model);
      this._addToChosenPhrases(model);
    },
    removeWord(wordObj) {
      this._removeWordFromModel(wordObj);
      this._removeWordFromQueue(wordObj);
    }
  },

  _addToChosenPhrases() {
    const phrase = get(this, 'currentModel.phrase');
    const currentQueue = get(this, 'audio.queue');

    phrase.set('words', currentQueue);
    phrase.notifyPropertyChange('words');
  },
  _removeWordFromModel(wordObj) {
    const phrase = get(this, 'currentModel.phrase');
    const words = get(phrase, 'words');
    const id = get(wordObj, 'id');

    words.removeObject(id);
    phrase.notifyPropertyChange('words');
  },
  _removeWordFromQueue(word) {
    const audio = get(this, 'audio');
    audio.removeFromQueue(word);
  },

  _initializeDefaultAudio(chosenWords) {
    const audio = get(this, 'audio');
    audio.addBatchToQueue(chosenWords);
  }
});
