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
exports.DropboxHandler = void 0;
const dropbox_1 = require("dropbox");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_path_2 = require("node:path");
class DropboxHandler {
    constructor() {
        this.token = "";
        this.sourceFile = "";
        this.fileName = "";
        this.parentFolder = "/uploads";
    }
    setToken(token) {
        if (!token)
            token = process.env.DROPBOX_TOKEN || "";
        this.token = token;
        return this;
    }
    setFileToUpload(filePath) {
        this.sourceFile = filePath;
        this.fileName = (0, node_path_2.basename)(filePath);
        return this;
    }
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new dropbox_1.Dropbox({ accessToken: this.token });
            const content = (0, node_fs_1.createReadStream)(this.sourceFile);
            const options = {
                path: node_path_1.default.join(this.parentFolder, this.fileName),
                contents: content,
            };
            const response = yield db.filesUpload(options);
            console.log(JSON.stringify(response.result));
        });
    }
}
exports.DropboxHandler = DropboxHandler;
//# sourceMappingURL=dropbox.js.map