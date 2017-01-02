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
    },
    play() {
      const audio = get(this, 'audio');
      audio.playAll();
    },
    clear() {
      this._removeAllWordsFromQueue();
      this._removeAllWordsFromModel();
    },
    share() {
      //this._savePhrase();
    },
    openModal() {
      const controller = this.controllerFor('application');
      controller.set('modalIsOpen', true);
    }
  },

  _addToChosenPhrases() {
    const phrase = get(this, 'currentModel.phrase');
    const currentQueue = get(this, 'audio.queue');

    phrase.set('words', currentQueue);
    phrase.notifyPropertyChange('words');
  },

  _removeAllWordsFromModel() {
    const phrase = get(this, 'currentModel.phrase');
    phrase.set('words', []);
    phrase.notifyPropertyChange('words');
  },

  _removeWordFromModel(wordObj) {
    const phrase = get(this, 'currentModel.phrase');
    const words = get(phrase, 'words');
    const id = get(wordObj, 'id');

    words.removeObject(id);
    phrase.notifyPropertyChange('words');
  },

  _removeAllWordsFromQueue() {
    const audio = get(this, 'audio');
    audio.clearQueue();
  },

  _removeWordFromQueue(word) {
    const audio = get(this, 'audio');
    audio.removeFromQueue(word);
  },

  _initializeDefaultAudio(chosenWords) {
    const audio = get(this, 'audio');
    audio.addBatchToQueue(chosenWords);
  },

  _savePhrase() {
    const phrase = get(this, 'currentModel.phrase');
    phrase.save()
      .then(() => {
        this.send('openModal');
      });
  }
});
