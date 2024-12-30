"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDrive = void 0;
const googleapis_1 = require("googleapis");
const mime_types_1 = __importDefault(require("mime-types"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
class GoogleDrive {
    constructor() {
        this.configPath = "";
        this.sourceFile = "";
    }
    setConfig(configPath) {
        this.configPath = configPath;
        return this;
    }
    setFileToUpload(filePath) {
        this.sourceFile = filePath;
        return this;
    }
    getAuth() {
        return new googleapis_1.google.auth.GoogleAuth({
            keyFile: this.configPath,
            scopes: SCOPES,
        });
    }
    getFileInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            const sf = this.sourceFile;
            const body = (0, node_fs_1.createReadStream)(sf);
            const type = mime_types_1.default.lookup(sf);
            const name = (0, node_path_1.basename)(sf);
            return { type, body, name };
        });
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, body, name } = yield this.getFileInformation();
            const auth = this.getAuth();
            const { data } = yield googleapis_1.google.drive({ version: "v3", auth })
                .files
                .create({
                media: {
                    mimeType: type,
                    body,
                },
                requestBody: {
                    name,
                    parents: ["1FbDkwDG6n0B3yULC_tEbyn_GlsjhKFHj"],
                },
                fields: "id,name,webViewLink,webContentLink,size",
            });
            return JSON.stringify(data);
        });
    }
}
exports.GoogleDrive = GoogleDrive;
//# sourceMappingURL=google-drive.js.map