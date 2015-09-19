import Ember from 'ember';
import soundManager from 'soundManager';

const {
  A:emberArray,
  get
} = Ember;

export default Ember.Service.extend({
  queue: emberArray([]),
  playAll() {
    this.playNext();
  },
  playNext() {
    const queue = get(this, 'queue');
    const upNext = queue.pop();

    soundManager.play(upNext, {
      onfinish: this.playNext.bind(this)
    });
  },
  // debugLoadAudio() {
  //   soundManager.onready(this._debugLoadAllAudio.bind(this));
  // },
  // _debugLoadAllAudio() {
  //   const queue = get(this, 'queue');
  //   AUDIO.forEach(s => {
  //     const sound = soundManager.createSound({ url: s });
  //     queue.pushObject(sound.id);
  //   });
  // },
});
