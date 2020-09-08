# Getting Started

## 1. Clone this repository

`$ git clone `

## 2. Change direcotry into the cloned project

`$ cd react-native-simple-demo/`

## 3. Install dependencies

`$ yarn install` or `$ npm install`

## 4. Create credentials file

Create a `secret.json` file at the root directory of the project. With the following information.

```json
{
  "branchId": "<my_branch_id>", // OkHi issued branch id
  "clientKey": "<my_client_key>", // OkHi issued client key
  "phone": "<my_phone_number>" // Your phone number that you'll use to test with
}
```

## 5. Review OkHiAuth.js file

Open the `OkHiAuth.js` file and make sure you're running the app in the mode that corresponds with your issued keys. Default is SANDBOX.

## 5. Run the app

`$ yarn android`

## Documentation

- [Guides](https://docs.okhi.co/v/v5.0-alpha/okhi-on-your-react-native-app)

- [Best Practices](https://docs.google.com/document/d/1kxolQJ4n6tEgReuqVLYpDVMW--xvqv5UQ7AdvrN0Uw0)

- [API Reference](https://okhi.github.io/react-native-okverify/)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
