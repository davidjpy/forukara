module.exports = {
    root: true,
    ignorePatterns: ['node_modules/*'],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:css-import-order/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'css-import-order'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        'react/self-closing-comp': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                groups: [['external', 'builtin'], 'internal', 'type'],
                pathGroups: [
                    {
                        pattern: '@/app/**',
                        group: 'internal',
                    },
                ],
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
