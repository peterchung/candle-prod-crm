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
exports.getRemoteListOptions = exports.executeAction = void 0;
const monday_service_1 = __importDefault(require("../services/monday-service"));
const transformation_service_1 = __importDefault(require("../services/transformation-service"));
const transformation_1 = __importDefault(require("../constants/transformation"));
// use this as an action to monday.com trigger
function executeAction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { shortLivedToken } = req.session;
        const { payload } = req.body;
        console.log('this is payload:', payload);
        try {
            // TODO: Implement this function
            console.log('executeAction in try block', { payload });
            const { inputFields } = payload;
            const { boardId, itemId, sourceColumnId, targetColumnId, transformationType, } = inputFields;
            const text = yield monday_service_1.default.getColumnValue(shortLivedToken, itemId, sourceColumnId);
            if (!text) {
                return res.status(200).send({});
            }
            const transformedText = transformation_service_1.default.transformText(text, transformationType ? transformationType.value : 'TO_UPPER_CASE');
            yield monday_service_1.default.changeColumnValue(shortLivedToken, boardId, itemId, targetColumnId, transformedText);
            return res.status(200).send({});
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'internal server error' });
        }
    });
}
exports.executeAction = executeAction;
function getRemoteListOptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                options: transformation_1.default,
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'internal server error' });
        }
    });
}
exports.getRemoteListOptions = getRemoteListOptions;
