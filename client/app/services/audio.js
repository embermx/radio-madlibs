import Ember from 'ember';
import soundManager from 'soundManager';

const {
  A:emberArray,
  get,
  set
} = Ember;

export default Ember.Service.extend({
  queue: emberArray([]),
  addToQueue(obj) {
    soundManager.onready(() => {
      const queue = get(this, 'queue');
      const sound = soundManager.createSound(obj);
      queue.pushObject(sound.id);
    });
  },
  addBatchToQueue(objectArray) {
    objectArray.forEach(obj => this.addToQueue(obj));
  },
  removeFromQueue(obj) {
    const queue = get(this, 'queue');
    const id = get(obj, 'id');
    queue.removeObject(id);
  },
  clearQueue() {
    set(this, 'queue', emberArray([]));
  },
  playAll() {
    const queue = get(this, 'queue');
    set(this, 'playQueue', queue.copy());
    this.playNext();
  },
  playNext() {
    const playQueue = get(this, 'playQueue');
    const upNext = playQueue.shift();

    soundManager.play(upNext, {
      onfinish: this.playNext.bind(this)
    });
  },
});
