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
const monday_sdk_js_1 = __importDefault(require("monday-sdk-js"));
class MondayService {
    static getColumnValue(token, itemId, columnId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mondayClient = (0, monday_sdk_js_1.default)();
                mondayClient.setToken(token);
                mondayClient.setApiVersion("2024-01");
                const query = `query($itemId: [ID!], $columnId: [String!]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            value
          }
        }
      }`;
                const variables = { columnId, itemId };
                const response = yield mondayClient.api(query, { variables });
                return response.data.items[0].column_values[0].value;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static changeColumnValue(token, boardId, itemId, columnId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mondayClient = (0, monday_sdk_js_1.default)({ token });
                mondayClient.setApiVersion("2024-01");
                const query = `mutation change_column_value($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
                const variables = { boardId, columnId, itemId, value };
                const response = yield mondayClient.api(query, { variables });
                return response;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = MondayService;
