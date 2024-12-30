import { GoogleDrive } from "./services/google-drive";
import path from "node:path";

new GoogleDrive()
    .setConfig(path.resolve("./assets/google/service-account.json"))
    .setFileToUpload(path.resolve("./assets/test-files/test-1.png"))
    .upload()
    .then(console.log)
    .catch(console.error);
