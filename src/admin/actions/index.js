import _ from 'lodash';

import * as searchAction from './search-action';
import * as transAction from './trans-action';

export default _.assign(
  searchAction, transAction,
);

export const search = searchAction;
export const trans = transAction;
