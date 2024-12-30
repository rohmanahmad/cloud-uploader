import { Dropbox } from "dropbox";
import { createReadStream } from "node:fs";
import path from "node:path";
import { basename } from "node:path";

export class DropboxHandler {
    protected token: string = "";
    protected sourceFile: string = "";
    protected fileName: string = "";
    protected parentFolder: string = "/uploads";

    setToken(token: string): this {
        if (!token) token = process.env.DROPBOX_TOKEN || "";
        this.token = token;
        return this;
    }

    setFileToUpload(filePath: string): this {
        this.sourceFile = filePath;
        this.fileName = basename(filePath);
        return this;
    }

    async upload() {
        const db = new Dropbox({ accessToken: this.token });
        const content = createReadStream(this.sourceFile);
        const options = {
            path: path.join(this.parentFolder, this.fileName),
            contents: content,
        };
        const response = await db.filesUpload(options);
        console.log(JSON.stringify(response.result));
    }
}
