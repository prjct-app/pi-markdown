import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeOneLineFences } from '../index.ts';

test('normalization preserves real shell commands and literal examples inside code blocks', () => {
  assert.equal(normalizeOneLineFences('``` bash script.sh ```'), '```\nbash script.sh\n```');
  const nested = '````markdown\n```bash npm test```\n````';
  assert.equal(normalizeOneLineFences(nested), nested);
});

test('normal Markdown and genuine multiline blocks are unchanged', () => {
  for (const text of ['# Heading\n\n**Bold** and `inline`.', '```bash\nnpm test\n```', '    ```bash npm test```']) assert.equal(normalizeOneLineFences(text), text);
  assert.equal(normalizeOneLineFences('```bash npm test```'), '```bash\nnpm test\n```');
});
