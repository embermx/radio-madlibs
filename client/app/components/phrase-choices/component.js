import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  tagName: '',

  actions: {
    removeWord(word) {
      this.sendAction('removeWord', word);
    },
    myStartAction: function(content) {
     //Content is the same as the content parameter set above 
     console.log('startAction', this.toString());
    },
    myEndAction: function(content) {
      //Content is the same as the content parameter set above 
     console.log('endAction', this.toString());
    },
  }
});
