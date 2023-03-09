module.exports = {
    root: true,
    ignorePatterns: ['node_modules/*'],
    parser: '@typescript-eslint/parser',
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    plugins: ['import'],
    settings: {
        'import/extensions': ['.js', '.jsx'],
        'import/resolver': {
            typescript: true,
            node: true,
        },
    },
    rules: {
        'react/self-closing-comp': 'error',
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                warnOnUnassignedImports: true,
                groups: ['builtin', 'external', 'internal', 'type'],
                pathGroups: [
                    {
                        pattern: '*.css',
                        group: 'internal',
                        patternOptions: { matchBase: true },
                        position: 'after',
                    },
                    {
                        pattern: '@/app/**',
                        group: 'internal',
                    },
                    {
                        pattern: '@/utils/**',
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
