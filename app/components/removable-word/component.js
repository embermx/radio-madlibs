import Ember from 'ember';

const {
  get
} = Ember;

const {
  Component
} = Ember;

export default Component.extend({
  actions: {
    remove() {
      const word = get(this, 'word');
      this.sendAction('remove', word);
    }
  }
});
