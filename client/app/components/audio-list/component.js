import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  actions: {
    myStartAction: function(content) {
     //console.log('myStartAction', content);
    },
    myEndAction: function(content) {
     //console.log('myEndActin', content);
    },
  }
});
