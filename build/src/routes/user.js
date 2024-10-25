"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const helper_1 = require("../helper");
const validation = __importStar(require("../validation"));
const router = express_1.default.Router();
// Authentication
router.post('/signup', validation.signUp, controller_1.userController.signUp);
router.post('/login', validation.login, controller_1.userController.login);
router.use(helper_1.userJWT);
// Category
router.get('/category', controller_1.userController.getCategory);
// Post
router.post('/post', controller_1.userController.addPost);
router.get('/post', controller_1.userController.getPost);
router.put('/post', controller_1.userController.updatePost);
router.delete('/post/:id', controller_1.userController.deletePost);
exports.userRoutes = router;
//# sourceMappingURL=user.js.map