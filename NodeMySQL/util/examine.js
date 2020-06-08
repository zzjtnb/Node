exports.getExamine = function (examine) {
  switch (examine) {
    case '.html':
      return 'text/html' + charset;
    case '.css':
      return 'text/css' + charset;
    case '.js':
      return 'text/javascript' + charset;
    case '.json':
      return "application/json";
    default:
      return 'text/html' + charset;
  }
}