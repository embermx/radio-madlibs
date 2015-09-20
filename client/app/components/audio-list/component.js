import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'ul',
  classNames: ['list', 'list--h-to-v'],
  actions: {
    myStartAction: function(content) {
     //console.log('myStartAction', content);
    },
    myEndAction: function(content) {
     //console.log('myEndActin', content);
    },
  }
});
