"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_drive_1 = require("./services/google-drive");
const path_1 = __importDefault(require("path"));
new google_drive_1.GoogleDrive()
    .setConfig(path_1.default.resolve("./assets/google/service-account.json"))
    .setFileToUpload(path_1.default.resolve("./assets/test-files/test-1.png"))
    .upload()
    .then(console.log)
    .catch(console.error);
//# sourceMappingURL=index.js.map