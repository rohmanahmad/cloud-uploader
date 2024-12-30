import { DropboxHandler } from "./services/dropbox";
import path from "node:path";
import { configDotenv } from "dotenv";
configDotenv({ path: path.resolve("src/.env") });
/* import prompt from "prompt";

type PromptResult = {
    accessToken: string;
};
prompt.start();
prompt.get({
    properties: {
        accessToken: {
            description: "Input Token",
        },
    },
}, (error, result: PromptResult) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }

}); */
new DropboxHandler()
    .setToken(process.env.DROPBOX_TOKEN || "")
    .setFileToUpload(path.resolve("./assets/test-files/old.png"))
    .upload()
    .then((res) => console.log(res))
    .catch((err) => {
        console.error(err);
    });
