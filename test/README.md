# Module Import Compatibility Tests

This directory contains automated tests to ensure the library maintains compatibility with both CommonJS and ESM import systems, preventing regression of issues like #158.

## Test Coverage

### 1. Dual Package Structure Tests
- Verifies separate CJS and ESM build directories exist
- Confirms correct `package.json` files with appropriate `type` fields
- Ensures proper module type declarations

### 2. CommonJS Import Tests
- Tests `require()` functionality for CJS builds
- Validates all exported modules load without errors

### 3. ESM Import Tests
- Tests dynamic `import()` functionality for ESM builds
- Verifies `.js` extensions are present in all relative imports
- Ensures proper ESM module loading

### 4. Package.json Configuration Tests
- Validates `exports` field configuration
- Confirms `main` and `module` field values
- Ensures dual package compatibility

### 5. File Extension Tests
- Scans all ESM files for missing `.js` extensions
- Prevents the core issue that caused #158

## Running Tests

```bash
# Run only import compatibility tests
npm run test-imports

# Run all tests (includes import tests)
npm test
```

## Continuous Integration

These tests are automatically run in the CI pipeline to catch any regressions before they reach production.

## Issue Prevention

These tests specifically prevent:
- **Issue #158**: ESM import failure due to missing file extensions
- Module resolution conflicts
- Incorrect dual package structure
- Missing or incorrect package.json type declarations
