# AntonPay

To run the project:

```shell
npm install
```

This will install the dependencies required to run the boilerplate.

```shell
npm run dev
```

Boom! These scripts run your server, client and storybook in development mode.

The default PORTS are:

- `3001` for the server
- `3000` for the client
- `6006` for the storybook

If you don't like to call all scripts at once, you can also run:

```shell
npm run server:dev
npm run client:dev
npm run storybook
```

You can configure the server port by setting the `PORT` environment variable. Creating a `.env` file is supported. You can copy `.env.example` to `.env`.

| KEY  | VALUE                                                         |
| ---- | ------------------------------------------------------------- |
| PORT | (Optional) Port for the server environment (defaults to 3001) |

## Building

To build the project, run:

```shell
npm run build
```

This will build the client, server and storybook.

```shell
npm start
```

In production, you have a single server serving everything.

`/api/*` is the API endpoint.  
`/storybook` is the Storybook.  
`/*` is the client.

## Tests

A test runner is not installed (right now). But TypeScript, linter and prettier are checked on commit and push thanks to husky and lintstaged.

## Licensing

MIT
