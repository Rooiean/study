import _ from 'lodash';
import store from 'store';
import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

const t = (key, description, props = {}) => {
  const _props = _.isObject(description) ? description : props;
  const _description = _.isString(description) ? description : '';

  if (!_.has(store, 'getState')) { return _description; }

  const { locale, common } = store.getState();
  const _locale = locale || _.get(common, 'locale', {});
  const { current, defaults } = _locale;
  const _current = current || _.get(common, 'currentLocale');

  const defaultMessage = _.get(defaults, key, _description || key);
  let message = _.get(_locale[_current], key, defaultMessage);

  if (!_.has(_locale[_current], key)) {
    return <span className="no-translate">{message}</span>;
  }

  if (/<[a-z][\s\S]*>/i.test(message) || !_.isEmpty(_props)) {
    return <FormattedHTMLMessage message={message} {..._props} />;
  }

  return message;
};

export default { t };
