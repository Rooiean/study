import _ from 'lodash';

import * as searchAction from './search-action';
import * as transAction from './trans-action';
import * as costAction from './cost-action';

export default _.assign(
  searchAction, transAction, costAction,
);

export const search = searchAction;
export const trans = transAction;
export const costs = costAction;
