import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  actions: {
    addToQueue(obj, ops) {
      this.sendAction('addToQueue', obj, ops);
    },
    myOverAction: function() {
      //will notify you when an object is being dragged over the drop target 
    },
    myDragOutAction: function() {
      //will notify you when an object has left the drop target area 
    },
    removeWord(word) {
      this.sendAction('removeWord', word);
    }
  }
});
