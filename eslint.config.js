import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import erasableSyntaxOnly from 'eslint-plugin-erasable-syntax-only'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			erasableSyntaxOnly.configs.recommended,
		],
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},

		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},

		rules: {
			...reactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{ allowInterfaces: 'always' },
			],
		},
	},
)
