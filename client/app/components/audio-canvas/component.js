import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: '',

  chosenPhrase: computed('phrase.words', function() {
    const wordIds = get(this, 'phrase.words');
    const availableAudio = get(this, 'availableAudio');
    const chosenWordObjects = wordIds.map(id => availableAudio.findBy('id', id));

    return chosenWordObjects;
  }),

  actions: {
    addToQueue(obj, ops) {
      this.sendAction('addToQueue', obj, ops);
    },
    myOverAction: function() {
      //will notify you when an object is being dragged over the drop target 
      console.log('overAction', this.toString());
    },
    myDragOutAction: function() {
      //will notify you when an object has left the drop target area 
      console.log('outAction', this.toString());
    },
    removeWord(word) {
      this.sendAction('removeWord', word);
    },
    play() {
      this.sendAction('play');
    },
    clear() {
      this.sendAction('clear');
    },
    share() {
      this.sendAction('share');
    }
  }
});
