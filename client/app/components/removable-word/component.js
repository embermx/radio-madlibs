import Ember from 'ember';

const {
  get
} = Ember;

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'button',
  classNames: ['btn', 'btn--big', 'btn--row'],
  click() {
    const word = get(this, 'word');
    this.sendAction('remove', word);
  }
});
