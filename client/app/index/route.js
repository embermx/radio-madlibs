import Ember from 'ember';
import ActionHandlerMixin from 'radio-madlibs/mixins/action-handler';

const {
  Route,
  get,
  RSVP
} = Ember;

export default Route.extend(ActionHandlerMixin, {
  model() {
    const store = get(this, 'store');
    const fixtures = get(this, 'files');

    return RSVP.hash({
      availableAudio: fixtures,
      phrase: store.createRecord('phrase', {words: []})
     });
  }
});
