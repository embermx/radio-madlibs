import Ember from 'ember';

const {
  Route,
  inject,
  get,
  computed,
  RSVP
} = Ember;

export default Route.extend({
  model(params) {
    const store = get(this, 'store');
    const fixtures = get(this, 'files');

    return RSVP.hash({
      availableAudio: fixtures,
      phrase: store.find('phrase', params.phrase_id)
     });
  }
});
