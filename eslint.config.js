import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import security from 'eslint-plugin-security'
import noUnsanitized from 'eslint-plugin-no-unsanitized'
import { defineConfig, globalIgnores } from 'eslint/config'

// eslint-plugin-react-refresh is a Vite-only plugin (it inserts HMR boundaries).
// This project uses Next.js — react-refresh is managed by Next.js internally.
// Removed to fix "Cannot find package 'eslint-plugin-react-refresh'" build error.

export default defineConfig([
  globalIgnores(['dist', '.next', 'out', 'node_modules']),
  security.configs.recommended,
  noUnsanitized.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // 1. Eval Misuse
      // VULNERABLE: eval("console.log('" + userInput + "')")
      // SAFE: console.log(userInput)
      'security/detect-eval-with-expression': 'error',

      // 2. Unsafe innerHTML
      // VULNERABLE: <div dangerouslySetInnerHTML={{ __html: userInput }} />
      // SAFE: <div>{userInput}</div> or DOMPurify.sanitize(userInput)
      'no-unsanitized/property': 'error',
      'no-unsanitized/method': 'error',

      // 3. Unvalidated Redirects
      // VULNERABLE: window.location.href = new URLSearchParams(window.location.search).get('next');
      // SAFE: const url = new URLSearchParams(window.location.search).get('next');
      //       if (url.startsWith('/')) window.location.href = url;
      // Note: Handled by secure coding practices as standard ESLint plugins lack a dedicated unvalidated redirect rule.

      // 4. Path Traversal
      // VULNERABLE: fs.readFile(path.join(__dirname, req.query.file))
      // SAFE: const safeFile = path.basename(req.query.file); fs.readFile(path.join(__dirname, safeFile))
      'security/detect-non-literal-fs-filename': 'error',

      // 5. Object Injection
      // VULNERABLE: const userProp = req.query.prop; const val = obj[userProp];
      // SAFE: const userProp = req.query.prop; const val = obj.hasOwnProperty(userProp) ? obj[userProp] : null;
      'security/detect-object-injection': 'off',
    },
  },
])
