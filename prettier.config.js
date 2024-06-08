/** @type {import("prettier").Config} */
const shared = {
    bracketSameLine: false,
    bracketSpacing: true,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: 'all',
}

const css = {
    files: '*.css',
    options: {
        cssDeclarationSorterOrder: 'alphabetical',
        parser: 'css',
        plugins: ['prettier-plugin-css-order'],
    },
}

/** @type {import("prettier").Config} */
const config = {
    ...shared,
    overrides: [css],
}

export default config
