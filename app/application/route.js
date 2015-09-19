import Ember from 'ember';

const {
  Route
} = Ember;

const AUDIO = [
  'a-warning.wav',
  'coming-up.wav',
  'a-warning-we-totally-changed-podcasts.wav'
];

const ASSETS_ROOT = '/assets/wav';

function debugCreateAudio() {
  return AUDIO.map((a, i) => ({
    url: `${ASSETS_ROOT}/${a}`,
    id: i,
    label: a.replace('-', ' ')
  }));
}

export default Route.extend({
  model() {
   return debugCreateAudio();
  }
});
