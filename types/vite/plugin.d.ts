export function createLogger(): import("vite").Logger;
/**
 * @param {DB} input
 * @param {DB} output
 * @param {import('vite').Logger} [logger]
 * @returns {Promise<{total: number, processed: number, ignored: number, updatedURIs: string[]}>}
 */
export function buildSite(input: DB, output: DB, logger?: import("vite").Logger | undefined): Promise<{
    total: number;
    processed: number;
    ignored: number;
    updatedURIs: string[];
}>;
/**
 *
 * @param {Object} input
 * @param {DB} input.input
 * @param {DB} input.output
 * @param {import('vite').Logger} [input.logger]
 * @returns {object}
 */
export default function nan0webVitePlugin({ input, output, logger }: {
    input: DB;
    output: DB;
    logger?: import("vite").Logger | undefined;
}): object;
import DB from '@nan0web/db';
