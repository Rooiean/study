/* global mixpanel, ga */

import _ from 'lodash';

const analyzer = {};

analyzer.track = (message, props = {}) => {
  if (_.isEmpty(mixpanel) || _.isEmpty(message)) { return; }

  mixpanel.track(message, props);
};

analyzer.event = (category, action, label, value) => {
  ga('send', 'event', category, action, label, value);
};

export default analyzer;
