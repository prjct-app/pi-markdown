# pi-minimalist-markdown

Display-only Markdown normalization for the [Pi coding agent](https://github.com/earendil-works/pi-mono).

The extension uses Pi's documented `registerMarkdownTransformer()` API to convert malformed one-line fenced snippets such as `````bash npm test``` `` into standard multiline fences before rendering. It changes only finalized assistant display text; streaming content, user messages, thinking blocks, session history, and model context remain unchanged.

## Install

```sh
pi install git:github.com/prjct-app/pi-minimalist-markdown
```

Restart Pi after installation. Remove it with:

```sh
pi remove git:github.com/prjct-app/pi-minimalist-markdown
```

The package has not been published to npm.

## Compatibility

Tested with Pi `0.85.1` and Node.js `22.19+` using the public Markdown transformer interface.

## Development

```sh
npm install
npm run check
npm test
npm pack --dry-run
```

## License

[MIT](LICENSE)
