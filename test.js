import { Directory } from "@nan0web/db"
import { buildSite } from "./src/vite/index.js"
import FS from "@nan0web/db-fs"

class JSONDirectory extends Directory {
	static DATA_EXTNAMES = [".json"]
}
class JSONFS extends FS {
	static Directory = JSONDirectory
}

const input = new FS({ root: "data" })
const output = new JSONFS({ root: "dist" })

async function main() {
	await buildSite(input, output)
}

main().catch(err => {
	console.error(err.stack ?? err.message)
})
