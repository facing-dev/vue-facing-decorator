// Test script to verify ESM import fix
console.log('Testing ESM imports...');

// Test CommonJS import
try {
    const cjsImport = require('./dist/cjs/index.js');
    console.log('✓ CommonJS import successful:', typeof cjsImport);
} catch (error) {
    console.error('✗ CommonJS import failed:', error.message);
}

// Test ESM import
import('./dist/esm/index.js')
    .then((esmImport) => {
        console.log('✓ ESM import successful:', typeof esmImport);
        console.log(
            '✓ ESM import has default export:',
            typeof esmImport.default
        );
    })
    .catch((error) => {
        console.error('✗ ESM import failed:', error.message);
    });
