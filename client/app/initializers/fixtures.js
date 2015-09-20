import AUDIO from 'radio-madlibs/fixtures/files';

const ASSETS_ROOT = '/assets/mp3';

function debugCreateAudio() {
  return AUDIO.map(a => ({
    url: `${ASSETS_ROOT}/${a.url}`,
    id: a.id,
    label: a.label
  }));
}

export function initialize(container, application) {
  const files = debugCreateAudio();
  application.register('fixtures:files', files, {instantiate: false});
  application.inject('route:index', 'files', 'fixtures:files');
  application.inject('route:view', 'files', 'fixtures:files');
}

export default {
  name: 'fixtures',
  initialize
};
