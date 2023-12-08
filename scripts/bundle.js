import { getFiles } from './buildUtils';

const extensions = ['.js', '.ts'];
const excludeExtensions = ['.module.ts'];
const build = async () => {
    const result = await Bun.build({
        entrypoints: [...getFiles('./src', extensions, excludeExtensions)],
        outdir: './dist',
        format: 'esm',
        minify: true,
    });
    if (!result.success) {
        throw new AggregateError(result.logs, "Build failed");
    }
};

build();