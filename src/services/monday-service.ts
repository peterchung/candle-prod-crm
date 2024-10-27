import initMondayClient from 'monday-sdk-js';

class MondayService {
  static async getColumnValue(token, itemId, columnId) {
    try {
      const mondayClient = initMondayClient();
      mondayClient.setToken(token);
      mondayClient.setApiVersion('2024-01');

      const query = `query($itemId: [ID!], $columnId: [String!]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            value
          }
        }
      }`;
      const variables = { columnId, itemId };

      const response = await mondayClient.api(query, { variables });
      return response.data.items[0].column_values[0].value;
    } catch (err) {
      console.log(err);
    }
  }

  static async changeColumnValue(token, boardId, itemId, columnId, value) {
    try {
      const mondayClient = initMondayClient({ token });
      mondayClient.setApiVersion('2024-01');

      const query = `mutation change_column_value($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
      const variables = { boardId, columnId, itemId, value };

      const response = await mondayClient.api(query, { variables });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getItemName(token, itemId) {
    try {
      const mondayClient = initMondayClient();
      mondayClient.setToken(token);
      mondayClient.setApiVersion('2024-01');

      const query = `query($itemId: [ID!]) {
        items (ids: $itemId) {
          name
        }
      }`;

      const variables = { itemId: [itemId] };

      const response = await mondayClient.api(query, { variables });

      // Extract the name from the response
      if (response.data && response.data.items) {
        const itemNames = response.data.items.map((item) => item.name);
        return itemNames;
      } else {
        console.log('No items found or unexpected response structure.');
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default MondayService;
