"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_drive_1 = require("./services/google-drive");
const node_path_1 = __importDefault(require("node:path"));
new google_drive_1.GoogleDrive()
    .setConfig(node_path_1.default.resolve("./assets/google/service-account.json"))
    .setFileToUpload(node_path_1.default.resolve("./assets/test-files/test-1.png"))
    .upload()
    .then(console.log)
    .catch(console.error);
//# sourceMappingURL=google-drive.js.map