function with_query_strings(request) {
  if (request._query.length === 0) {
    /* eslint-disable no-param-reassign */
    request._query = [Date.now().toString()];
  } else {
    request._query[0] += `&${Date.now().toString()}`;
    /* eslint-enable no-param-reassign */
  }

  return request;
}

export default (request) => {
  request.set('X-Requested-With', 'XMLHttpRequest');
  request.set('Expires', '-1');
  request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private');

  with_query_strings(request);

  return request;
};
