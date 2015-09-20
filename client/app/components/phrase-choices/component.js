import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: '',

  actions: {
    removeWord(word) {
      this.sendAction('removeWord', word);
    }
  }
});
