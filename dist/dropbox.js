"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropbox_1 = require("./services/dropbox");
const node_path_1 = __importDefault(require("node:path"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)({ path: node_path_1.default.resolve("src/.env") });
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
new dropbox_1.DropboxHandler()
    .setToken(process.env.DROPBOX_TOKEN || "")
    .setFileToUpload(node_path_1.default.resolve("./assets/test-files/old.png"))
    .upload()
    .then((res) => console.log(res))
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=dropbox.js.map