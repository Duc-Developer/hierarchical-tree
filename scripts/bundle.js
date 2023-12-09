import { getFiles } from './buildUtils';

const extensions = ['.js', '.ts'];
const excludeExtensions = ['.module.ts'];
const build = async () => {
    const esmResponses = await Bun.build({
        entrypoints: [...getFiles('./src', extensions, excludeExtensions)],
        outdir: './dist',
        format: 'esm',
        naming: "[dir]/[name].esm.[ext]",
    });
    if (!esmResponses.success) {
        throw new AggregateError(esmResponses.logs, "Bundle .esm failed");
    }
    const minifyResponses = await Bun.build({
        entrypoints: [...getFiles('./src', extensions, excludeExtensions)],
        outdir: './dist',
        format: 'esm',
        naming: "[dir]/[name].min.[ext]",
        minify: true,
    });
    if (!minifyResponses.success) {
        throw new AggregateError(esmResponses.logs, "Bundle .min failed");
    }
};

build();