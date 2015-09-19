import soundManager from 'soundManager';

export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  soundManager.setup({
    url: '/soundmanager/swf/',
    defaultOptions: {
      autoLoad: true,
    }
  });
}

export default {
  name: 'audio',
  initialize: initialize
};
