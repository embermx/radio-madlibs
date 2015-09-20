import DS from 'ember-data';

export default DS.Model.extend({
  words: DS.hasMany('word', {async: false})
});
