import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  ignores: ['dist/**', 'node_modules/**', 'js/**'],
  rules: {
    // JSON key ordering — config files have intentional ordering
    'jsonc/sort-keys': 'off',
    // process is fine in Vite/Node contexts
    'node/prefer-global/process': 'off',
    // shadcn components legitimately export non-component constants (e.g. buttonVariants)
    'react-refresh/only-export-components': 'off',
  },
})
