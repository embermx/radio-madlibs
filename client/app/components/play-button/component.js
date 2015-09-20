import Ember from 'ember';

const {
  inject,
  Component,
  get
} = Ember;

export default Component.extend({
  audio: inject.service(),
  didInitAttrs() {
  },
  actions: {
    play() {
      const audio = get(this, 'audio');
      audio.playAll();
    }
  }
});
