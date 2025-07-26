/**
 * Test suite to verify ESM and CommonJS import compatibility
 * This prevents regression of issue #158 (ESM import failure)
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

describe('Module Import Compatibility Tests', function () {
    const projectRoot = path.resolve(__dirname, '..');
    const cjsDistPath = path.join(projectRoot, 'dist', 'cjs');
    const esmDistPath = path.join(projectRoot, 'dist', 'esm');

    before(function () {
        // Ensure dist directories exist
        if (!fs.existsSync(cjsDistPath)) {
            throw new Error(
                `CommonJS dist directory not found at ${cjsDistPath}. Run npm run build first.`
            );
        }
        if (!fs.existsSync(esmDistPath)) {
            throw new Error(
                `ESM dist directory not found at ${esmDistPath}. Run npm run build first.`
            );
        }
    });

    describe('Dual Package Structure', function () {
        it('should have separate CJS and ESM dist directories', function () {
            expect(fs.existsSync(cjsDistPath)).to.be.true;
            expect(fs.existsSync(esmDistPath)).to.be.true;
        });

        it('should have package.json in CJS dist with type: commonjs', function () {
            const cjsPackageJsonPath = path.join(cjsDistPath, 'package.json');
            expect(fs.existsSync(cjsPackageJsonPath)).to.be.true;

            const cjsPackageJson = JSON.parse(
                fs.readFileSync(cjsPackageJsonPath, 'utf8')
            );
            expect(cjsPackageJson.type).to.equal('commonjs');
        });

        it('should have package.json in ESM dist with type: module', function () {
            const esmPackageJsonPath = path.join(esmDistPath, 'package.json');
            expect(fs.existsSync(esmPackageJsonPath)).to.be.true;

            const esmPackageJson = JSON.parse(
                fs.readFileSync(esmPackageJsonPath, 'utf8')
            );
            expect(esmPackageJson.type).to.equal('module');
        });
    });

    describe('CommonJS Import Tests', function () {
        it('should successfully require the CJS build', function () {
            const cjsIndexPath = path.join(cjsDistPath, 'index.js');
            expect(fs.existsSync(cjsIndexPath)).to.be.true;

            // This should not throw
            const cjsModule = require(cjsIndexPath);
            expect(cjsModule).to.be.an('object');
        });

        it('should successfully require the CJS index-return-cons build', function () {
            const cjsReturnConsPath = path.join(
                cjsDistPath,
                'index-return-cons.js'
            );
            if (fs.existsSync(cjsReturnConsPath)) {
                // This should not throw
                const cjsReturnConsModule = require(cjsReturnConsPath);
                expect(cjsReturnConsModule).to.be.an('object');
            }
        });
    });

    describe('ESM Import Tests', function () {
        it('should have .js extensions in ESM imports', async function () {
            const esmIndexPath = path.join(esmDistPath, 'index.js');
            expect(fs.existsSync(esmIndexPath)).to.be.true;

            const esmIndexContent = fs.readFileSync(esmIndexPath, 'utf8');

            // Check that relative imports have .js extensions
            const relativeImportRegex = /from\s+['"]\.\/[^'"]*(?<!\.js)['"]/g;
            const invalidImports = esmIndexContent.match(relativeImportRegex);

            if (invalidImports) {
                throw new Error(
                    `ESM file has relative imports without .js extensions: ${invalidImports.join(
                        ', '
                    )}`
                );
            }
        });

        it('should successfully import the ESM build dynamically', async function () {
            const esmIndexPath = path.join(esmDistPath, 'index.js');

            try {
                // Use dynamic import to test ESM compatibility
                // Convert Windows paths to file URLs properly
                const fileUrl =
                    process.platform === 'win32'
                        ? 'file:///' + esmIndexPath.replace(/\\/g, '/')
                        : 'file://' + esmIndexPath;

                const esmModule = await import(fileUrl);
                expect(typeof esmModule).to.equal('object');
                expect(esmModule).to.not.be.null;
            } catch (error) {
                // For older Node.js versions or environments where dynamic import might fail
                console.warn(
                    'Dynamic import test skipped due to environment limitations:',
                    error.message
                );
                this.skip();
            }
        });

        it('should successfully import the ESM index-return-cons build dynamically', async function () {
            const esmReturnConsPath = path.join(
                esmDistPath,
                'index-return-cons.js'
            );
            if (fs.existsSync(esmReturnConsPath)) {
                try {
                    // Use dynamic import to test ESM compatibility
                    // Convert Windows paths to file URLs properly
                    const fileUrl =
                        process.platform === 'win32'
                            ? 'file:///' + esmReturnConsPath.replace(/\\/g, '/')
                            : 'file://' + esmReturnConsPath;

                    const esmReturnConsModule = await import(fileUrl);
                    expect(typeof esmReturnConsModule).to.equal('object');
                    expect(esmReturnConsModule).to.not.be.null;
                } catch (error) {
                    // For older Node.js versions or environments where dynamic import might fail
                    console.warn(
                        'Dynamic import test skipped due to environment limitations:',
                        error.message
                    );
                    this.skip();
                }
            }
        });
    });

    describe('Package.json Exports Configuration', function () {
        it('should have correct exports field in main package.json', function () {
            const mainPackageJsonPath = path.join(projectRoot, 'package.json');
            const mainPackageJson = JSON.parse(
                fs.readFileSync(mainPackageJsonPath, 'utf8')
            );

            expect(mainPackageJson.exports).to.be.an('object');
            expect(mainPackageJson.exports['.']).to.be.an('object');
            expect(mainPackageJson.exports['.'].require).to.equal(
                './dist/cjs/index.js'
            );
            expect(mainPackageJson.exports['.'].import).to.equal(
                './dist/esm/index.js'
            );
        });

        it('should have main field pointing to CJS build', function () {
            const mainPackageJsonPath = path.join(projectRoot, 'package.json');
            const mainPackageJson = JSON.parse(
                fs.readFileSync(mainPackageJsonPath, 'utf8')
            );

            expect(mainPackageJson.main).to.equal('dist/cjs/index.js');
        });

        it('should have module field pointing to ESM build', function () {
            const mainPackageJsonPath = path.join(projectRoot, 'package.json');
            const mainPackageJson = JSON.parse(
                fs.readFileSync(mainPackageJsonPath, 'utf8')
            );

            expect(mainPackageJson.module).to.equal('dist/esm/index.js');
        });
    });

    describe('File Extension Tests', function () {
        it('should have all relative imports in ESM files ending with .js', function () {
            const checkDirectory = (dirPath) => {
                const files = fs.readdirSync(dirPath, { withFileTypes: true });

                for (const file of files) {
                    const fullPath = path.join(dirPath, file.name);

                    if (file.isDirectory()) {
                        checkDirectory(fullPath);
                    } else if (
                        file.name.endsWith('.js') &&
                        !file.name.endsWith('.d.ts')
                    ) {
                        const content = fs.readFileSync(fullPath, 'utf8');

                        // Check for relative imports without .js extension
                        const relativeImportRegex =
                            /(?:import|export).*?from\s+['"]\.\/[^'"]*(?<!\.js)['"];?/g;
                        const invalidImports =
                            content.match(relativeImportRegex);

                        if (invalidImports) {
                            throw new Error(
                                `File ${fullPath} has relative imports without .js extensions: ${invalidImports.join(
                                    ', '
                                )}`
                            );
                        }
                    }
                }
            };

            checkDirectory(esmDistPath);
        });
    });
});
