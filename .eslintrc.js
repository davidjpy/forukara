module.exports = {
    root: true,
    ignorePatterns: ['node_modules/*'],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/consistent-type-imports': 'warn',
        'react/self-closing-comp': 'warn',
        'import/order': [
            'warn',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                patterns: ['../', './'],
            },
        ],
    },
};
