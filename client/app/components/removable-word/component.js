import Ember from 'ember';

const {
  get
} = Ember;

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn--blue', 'btn--big'],
  click() {
    const word = get(this, 'word');
    this.sendAction('remove', word);
  }
});
