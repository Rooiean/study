import $ from 'jquery';
import _ from 'lodash';

export function imageResize(url, params = {}) {
  const _params = $.param(_.assign({ url, width: 400 }, params));

  if (_.isEmpty(url)) {
    return '';
  }

  return `/thumbnails?${_params}`;
}

export default function imageResizeOrigin(url) {
  return url;
}
