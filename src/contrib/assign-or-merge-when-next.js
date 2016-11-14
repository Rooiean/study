import _ from 'lodash';

export default (state, action) =>
  _.assign({}, _.mergeWith(state, action.payload, (a, b) => {
    if (_.isArray(a)) {
      if (!action.payload.next) {
        return b;
      }

      return a.concat(b);
    }
  }));
