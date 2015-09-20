import Ember from 'ember';
import ActionHandlerMixin from 'radio-madlibs/mixins/action-handler';

const {
  Route,
  get,
  RSVP
} = Ember;

export default Route.extend(ActionHandlerMixin, {
  model(params) {
    const store = get(this, 'store');
    const fixtures = get(this, 'files');

    return RSVP.hash({
      availableAudio: fixtures,
      //phrase: store.find('phrase', params.phrase_id)
      phrase: store.createRecord('phrase', {words: [5,8,10]})
     });
  },

  afterModel(model) {
    const wordIds = get(model, 'phrase.words');
    const availableAudio = get(model, 'availableAudio');
    const chosenWordObjects = availableAudio.filter(obj => {
      return wordIds.contains(obj.id);
    });
    this._initializeDefaultAudio(chosenWordObjects);
  }
});
