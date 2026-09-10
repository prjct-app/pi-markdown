# pi-markdown

[![pi-markdown — extension for PI Agent](https://raw.githubusercontent.com/prjct-app/pi-image-preview/main/docs/covers/pi-markdown.png)](https://pi.dev)

Normalize malformed one-line Markdown code fences in Pi responses.

`@prjct.app/pi-markdown` · Assistant Markdown display transformer; one extension.

## Install

Requires Pi installed separately and Node.js **22.19 or later**. Compatibility is tested with **Pi 0.85.1**; newer versions are not yet verified. This is an independent community package.

Install with Pi's package manager:

```sh
pi install npm:@prjct.app/pi-markdown
```

For project-only installation, add `-l`: `pi install -l npm:@prjct.app/pi-markdown`. Restart Pi after installation. Do not install the same extension from both GitHub and npm: Pi treats those as different package identities.

## Usage

The transformer runs automatically when an assistant response finishes. For example, a malformed single-line fenced snippet is displayed as a normal code block:

Before:

````text
```bash npm test```
````

After:

````text
```bash
npm test
```
````

Existing multiline code blocks and ordinary Markdown are preserved. This is a focused display normalizer, not a general Markdown formatter. It leaves streaming output, user messages, thinking blocks, stored session text, and model context unchanged.


## Manage the package

For an npm installation:

```sh
pi list
pi update npm:@prjct.app/pi-markdown
pi remove npm:@prjct.app/pi-markdown
```

Use `pi config` to enable or disable individual resources. Use `pi config -l` for project settings and add `-l` to removal when you installed locally.

To pin version 0.1.2, use `pi install npm:@prjct.app/pi-markdown@0.1.2`. Pi skips pinned npm versions during package updates. For a Git installation, update or remove using the same `git:github.com/prjct-app/pi-minimalist-markdown` source instead of the npm source.

When switching from GitHub to npm, remove the Git installation first, then install the npm package and restart Pi.

## Troubleshooting

Wait until the assistant response finishes. The extension does not reformat streaming text or arbitrary inline code. If it is disabled, enable its extension resource with `pi config`.

## Package and API documentation

Registers the documented `pi.registerMarkdownTransformer()` hook and filters for finalized assistant messages.

See [Package structure and compatibility](docs/package.md) for the manifest, dependency policy, shipped resources, and official references. This package follows the [official Pi package guide](https://github.com/earendil-works/pi/blob/v0.85.1/packages/coding-agent/docs/packages.md) and [extension API guide](https://github.com/earendil-works/pi/blob/v0.85.1/packages/coding-agent/docs/extensions.md) for the tested version.

## Development

From a repository checkout:

```sh
npm ci --ignore-scripts
npm run check
npm test
npm run check:package
```

Pi loads the TypeScript entry point directly; no build step is required. To try this checkout for one run, use `pi -e .`. Tests use isolated temporary state and do not call model APIs. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution rules and [CHANGELOG.md](CHANGELOG.md) for release notes.

## License

[MIT](LICENSE).
