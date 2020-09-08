# Getting Started

## 1. Clone this repository

`$ git clone https://github.com/OkHi/react-native-simple-demo.git`

## 2. Change direcotry into the cloned project

`$ cd react-native-simple-demo/`

## 3. Install dependencies

`$ yarn install` or `$ npm install`

## 4. Create credentials file

Create a `secret.json` file at the root directory of the project. With the following information.

```json
{
  "branchId": "<my_branch_id>",
  "clientKey": "<my_client_key>",
  "phone": "<my_phone_number>"
}
```

## 5. Review OkHiAuth.js file

Open the `OkHiAuth.js` file and make sure you're running the app in the mode that corresponds with your issued keys. Default is SANDBOX.

## 6. Run the app

`$ yarn android`

## Documentation

- [Guides](https://docs.okhi.co/v/v5.0-alpha/okhi-on-your-react-native-app)

- [Best Practices](https://docs.google.com/document/d/1kxolQJ4n6tEgReuqVLYpDVMW--xvqv5UQ7AdvrN0Uw0)

- [API Reference](https://okhi.github.io/react-native-okverify/)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
