require('esbuild')
    .build({
        entryPoints: ['src/index.js'],
        bundle: true,
        outfile: 'dist.js',
        platform: 'node',
    })
    .catch(() => process.exit(1));
