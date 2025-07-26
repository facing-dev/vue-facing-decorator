# PR Title
Fix ESM import failure in v4.0.1 (#158)

# PR Description

## 🐛 Fix for Issue #158 - ESM Import Failure

This PR resolves the ESM import failure in v4.0.1 where imports like `import { Component, toNative, Vue } from 'vue-facing-decorator'` would fail with:

```
SyntaxError: The requested module 'vue-facing-decorator' does not provide an export named 'Component'
```

### Root Cause
The package declared `"type": "commonjs"` but shipped ESM files with `export` statements, causing Node.js to fail when parsing them in ESM contexts.

### Solution
Implemented a proper dual CommonJS/ESM package structure following Node.js best practices:

1. **Dual Package Structure**: Added separate `package.json` files in `dist/esm/` and `dist/cjs/` directories to override module types
2. **ESM Import Resolution**: Created postbuild script that adds `.js` extensions to relative imports in ESM files (required by Node.js ESM)
3. **Cross-platform Compatibility**: Updated build scripts to use `npx` and added `cross-env` for Windows support

### Changes Made
- ✅ **package.json**: Updated build scripts, added postbuild step, added cross-env dependency, bumped to v4.0.2
- ✅ **scripts/postbuild.js**: New script that creates package.json files and fixes import extensions
- ✅ **tsconfig/*.json**: Added explicit `moduleResolution: "node"` for consistency
- ✅ **Cross-platform**: Fixed Windows compatibility issues in build scripts

### Verification
- ✅ ESM imports work: `import { Component, toNative, Vue } from 'vue-facing-decorator'`
- ✅ CommonJS imports still work: `const { Component, toNative, Vue } = require('vue-facing-decorator')`
- ✅ No breaking changes for existing users
- ✅ Follows Node.js dual package guidelines

### Testing
The fix has been tested with both ESM and CommonJS imports to ensure compatibility.

Closes #158
