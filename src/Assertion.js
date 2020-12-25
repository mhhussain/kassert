//
// Assert class takes three parameters: name, checkValue, and assertFunction
//  name - name of assertion. Name will appear in response when an assertion fails
//  checkValue - assert function will assert this value in every request
//  assertFunction - function which actually checks each token in request against
//    the checkValue
//
class Assertion {
  constructor(name, checkValue, assertFunction) {
    this.name = name;
    this.check = checkValue;
    this.assertFunction = assertFunction;
  }

  assert(header, token, signature) {
    return this.assertFunction(this.check, token);
  }
}

module.exports = Assertion;
