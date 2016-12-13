import _ from 'lodash';

import * as searchAction from './search-action';
import * as transAction from './trans-action';
import * as costAction from './cost-action';
import * as airAction from './air-action';

export default _.assign(
  searchAction, transAction, costAction, airAction,
);

export const search = searchAction;
export const trans = transAction;
export const costs = costAction;
export const air = airAction;
