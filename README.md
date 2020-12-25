# kassert - Token Assertion Middleware

## Intro

This middleware allows the user to run custom assertions on JWT payloads via some simple configurations.

Examples of usage would be like checking a JWT token for a list of roles. kassert can be configured to verify a list of roles on every request.

## Usage

To use kassert, include it via express middleware config:

```
app.use(kassert({ assertions: [new Assertion('', '', (a,b) => {})] }));
```

### Assertion

An `Assertion` has the following parameters: `name`, `checkValue`, and `assertFunction`.

* `name` - The name of the assertion, this name will be sent with the response if an assertion fails
* `checkValue` - value passed into assertFunction (along with JWT), this value is static and meant to be what is asserted against
* `assertFunction` - function that is run every request, and given access to both configured checkValue and token. This function is what asserts that the checkValue matches what is expected in the token
  * note - assertFunction has access to: `{ header, token, signature }` from the JWT

### Standard Assertions

#### Standard Role Assertion

Verifies that a CSV list of roles in the request JWT contain all roles in a CSV list of checkValues.

I.e. the following scenario will return true:

```
JWT: 'A,B,C,E,F,H'
StandardRoleAssertion('E,F');
```

While this scenario will return false:

```
JWT: 'A,B,C,E,F,H'
StandardRoleAssertion('H,A,C,G');
```

