const assert = require('node:assert/strict');
const { test } = require('node:test');

test('the installed conventional-commit preset renders with the installed release-notes generator', async () => {
  const { generateNotes } = await import('@semantic-release/release-notes-generator');
  const notes = await generateNotes({ preset: 'conventionalcommits' }, {
    cwd: process.cwd(),
    branch: { name: 'main' },
    options: { repositoryUrl: 'https://github.com/prjct-app/pi-markdown.git' },
    commits: [{ hash: '0123456789abcdef', message: 'fix: publish package assets' }],
    lastRelease: { version: '0.1.3', gitTag: 'v0.1.3' },
    nextRelease: { version: '0.1.4', gitTag: 'v0.1.4' },
    logger: { log() {}, debug() {}, error() {} },
  });
  assert.match(notes, /publish package assets/);
  assert.match(notes, /0\.1\.4/);
});
