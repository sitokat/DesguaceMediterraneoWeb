// .eslintrc.cjs

module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    extends: ['@nuxtjs/eslint-config-typescript'],
    plugins: [],
    rules: {
        'eol-last': 0,
        'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
        'semi': 'off',
        'space-before-function-paren': 'off',
        'eqeqeq': 'off',
        'no-lonely-if': 'off',
        'no-var': 'off',
        'camelcase': 'off',
        'no-unmodified-loop-condition': 'off',
        'no-return-assign': 'off',
        'no-useless-escape': 'off',
        'keyword-spacing': ['error', {'overrides': {
          'if': {'after': false},
          'for': {'after': false},
          'while': {'after': false},
          'switch': {'after': false}
        }}],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/no-v-html': 'off',
        'vue/html-self-closing': 'off',
        'vue/valid-v-slot': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      },
  }