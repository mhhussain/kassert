const kassert = (options) => {

  return (req, res, next) => {

    // Retrieve Bearer token from header
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    // Split out Bearer token into: header, payload, and signature
    const [header, payload, signature] = token.split('.');

    const parsedPayload = JSON.parse(Buffer.from(payload, 'base64'));

    // If assertion succeeds, go next, otherwise return 401 unauth
    // TODO: Allow multiple assertions per request
    if (options.assertions[0].assert(header, parsedPayload, signature)) {
      next();
    } else {
      res.status(401).send(`${options.assertions[0].name} - assertion failed`);
    }
  };
}

module.exports = kassert;
