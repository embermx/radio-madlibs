import Ember from 'ember';
import DS from 'ember-data';

const {
  get
} = Ember;

export default DS.RESTSerializer.extend({
  serialize(record) {
    const words = get(record, 'words');
    const ids = words.map(w => w.id);

    return { words: ids };
  }
});
