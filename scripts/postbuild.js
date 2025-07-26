const fs = require('fs');
const path = require('path');

function addJsExtensions(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            addJsExtensions(fullPath);
        } else if (item.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Add .js extensions to relative imports and exports
            content = content.replace(
                /(['"])(\.\.?\/[^'"]+)\1/g,
                (match, quote, importPath) => {
                    // Don't add extension if it already has one
                    if (
                        importPath.includes('.js') ||
                        importPath.includes('.ts')
                    ) {
                        return match;
                    }
                    return `${quote}${importPath}.js${quote}`;
                }
            );

            // Match: import('./something')  or  import('./path/something')
            content = content.replace(
                /import\s*\(\s*(['"])(\.\/.+?)\1\s*\)/g,
                (match, quote, importPath) => {
                    // Don't add extension if it already has one
                    if (
                        importPath.includes('.js') ||
                        importPath.includes('.ts')
                    ) {
                        return match;
                    }
                    return `import(${quote}${importPath}.js${quote})`;
                }
            );

            fs.writeFileSync(fullPath, content);
        }
    }
}

// Create package.json files for proper module type resolution
const distDir = path.join(__dirname, '..', 'dist');

// ESM package.json
const esmDir = path.join(distDir, 'esm');
const esmPackageJson = { type: 'module' };
if (fs.existsSync(esmDir)) {
    fs.writeFileSync(
        path.join(esmDir, 'package.json'),
        JSON.stringify(esmPackageJson, null, 2)
    );
    console.log('Created package.json in dist/esm with type: module');

    // Add .js extensions to all imports in ESM files
    addJsExtensions(esmDir);
    console.log('Added .js extensions to all relative imports in ESM files');
}

// CJS package.json
const cjsDir = path.join(distDir, 'cjs');
const cjsPackageJson = { type: 'commonjs' };
if (fs.existsSync(cjsDir)) {
    fs.writeFileSync(
        path.join(cjsDir, 'package.json'),
        JSON.stringify(cjsPackageJson, null, 2)
    );
    console.log('Created package.json in dist/cjs with type: commonjs');
}

console.log('Postbuild script completed successfully');
