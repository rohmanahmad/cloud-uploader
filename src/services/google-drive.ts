import {
    GoogleAuth,
    JSONClient,
} from "google-auth-library/build/src/auth/googleauth";
import { google } from "googleapis";
import mime from "mime-types";
import { createReadStream, ReadStream } from "node:fs";
import { basename } from "node:path";

const SCOPES: string[] = ["https://www.googleapis.com/auth/drive"];

export class GoogleDrive {
    private configPath: string = "";
    private sourceFile: string = "";

    setConfig(configPath: string): this {
        this.configPath = configPath;
        return this;
    }

    setFileToUpload(filePath: string): this {
        this.sourceFile = filePath;
        return this;
    }

    getAuth(): GoogleAuth<JSONClient> {
        return new google.auth.GoogleAuth({
            keyFile: this.configPath,
            scopes: SCOPES,
        });
    }

    async getFileInformation(): Promise<
        { type: string | false; body: ReadStream; name: string }
    > {
        const sf = this.sourceFile;
        const body = createReadStream(sf);
        const type = mime.lookup(sf);
        const name = basename(sf);
        return { type, body, name };
    }

    async upload(): Promise<string> {
        const { type, body, name } = await this.getFileInformation();
        const auth = this.getAuth();
        const { data } = await google.drive({ version: "v3", auth })
            .files
            .create({
                media: {
                    mimeType: type as string,
                    body,
                },
                requestBody: {
                    name,
                    parents: ["1FbDkwDG6n0B3yULC_tEbyn_GlsjhKFHj"],
                },
                fields: "id,name,webViewLink,webContentLink,size",
            });
        return JSON.stringify(data);
    }
}
