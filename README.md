# Minimal reproducible example for webpack-dev-server split chunks bug

There are 3 entry points `a.js`, `b.js` and `c.js`. `a` and `b` have a common dependency to `utils.js`. Webpack with `optimization.splitChunks` option will generate a `common.js` chunk which `a.bundle.js` and `b.bundle.js` are depending on. The `c.bundle.js` can be used standalone.

cmd output:

```cmd
Entrypoint a = common.js a.bundle.js
Entrypoint b = common.js b.bundle.js
Entrypoint c = c.bundle.js
```

When instead of webpack-cli, webpack-dev-server is used with the same webpack config and code, the output `c.bundle.js` needs the `common.js` chunk to run.

cmd output:

```cmd
Entrypoint a = common.js a.bundle.js
Entrypoint b = common.js b.bundle.js
Entrypoint c = common.js c.bundle.js
```

In c.bundle.js:

```js
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([2,"common"]);
```

# Steps to reproduce

`npm install`,

Run `npm run build` to generate bundles with webpack-cli in the dist folder.

Run `npm start` and open http://localhost:9000/ to see the webpack-dev-server output and compare.
