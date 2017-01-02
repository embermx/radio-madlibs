import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['l-fixedfull', 'l-greenbg'],
  actions: {
    close() {
      this.sendAction('close')
    },
    copyLink() {
      this.send('copy')
    }
  }
});
