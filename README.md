# CCSEP-Asm1

## NoSQL Injection Vulnerabilities Demo Application

This program is a vulnerabilities webpage to demo the vulnerability of NoSQL Injection.

## Installation

- make build
- make run

## Usage

- [Run](http://localhost:3000) ( localhost:3000 )

## Exploitation

1. Use burp proxy to intercept requests.
2. Enter username of victim or a random username and password.
3. Intercept request with burp.
4. You will see the following line: <br />
   `POST /auth/login?username=<username>&password=<password> HTTP/1.1`
5. Change to `POST /auth/login?username=<username>&password[$ne]=null HTTP/1.1`
6. Forward the following request and you will be logged in.

## Patching

`git checkout patch` to switch to patched branch

1. Validate using 3rd party libraries such as [mongo-sanitize](https://github.com/vkarpov15/mongo-sanitize) for every request make sure there's no query object
2. If expecting a string from a user use `toString()` method to convert request into string.

## License

[MIT](https://choosealicense.com/licenses/mit/)
