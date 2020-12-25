const Assertion = require('./Assertion');

class StandardRoleAssertion extends Assertion {
  constructor(roleList) {
    // This functions verifies that a CSV list of strings is a subset
    // of another.
    // I.e. 'D,A,C' and 'A,B,C,D,E,F' would assert to true
    //      'A,Q,E' and 'A,B,C,D,E,F' would assert to false
    const assertFunction = (value, token) => {
      const check = {};
      token.roles.split(',').forEach((v, i) => { check[v] = i; });
      return value.split(',').every(v => check[v] !== undefined);
    };

    super('StandardRoleAssertion', roleList, assertFunction);
  }
}

module.exports = StandardRoleAssertion;
