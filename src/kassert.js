const router = require('express').Router();

const kassert = (options) => {

  console.log(options.assertions);

  return (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    const [header, payload, signature] = token.split('.');

    const parsedPayload = JSON.parse(Buffer.from(payload, 'base64'));

    console.log(options.assertions.role('UWMPRODSUPPORT,BILLINGVENDORADMIN,CLAIMSAPIADMIN,ClaimsApi,ARMDuckCreek_Usersclear', parsedPayload))

    next();
  };
}

module.exports = kassert;
