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
          column_values {
            value
            column {
              title
              id
            }
          }
        }
      }`;

      const variables = { itemId: [itemId] };
      const response = await mondayClient.api(query, { variables });

      return response.data.items;
    } catch (err) {
      console.log(err);
      throw new Error('Failed query item from Monday.com');
    }
  }

  static async updatedProdBoard(token, itemData) {
    try {
      const mondayClient = initMondayClient();
      mondayClient.setToken(token);
      mondayClient.setApiVersion('2024-01');

      const query = `mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columns: JSON!) {
      create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columns) {
      id
        }
      }`;

      const dateNow = new Date().toISOString().split('T')[0];
      const shippingAddress = `${itemData.city}, ${itemData.state}`;
      const columnValues = {
        text5: itemData.candleInscription,
        dropdown: {
          labels: itemData.selectedFragrances.map((cat) => cat.label),
        },
        numbers: 1,
        date_1: dateNow,
        text: itemData.firstName,
        text6: itemData.lastName,
        location: { lat: '40.7128', lng: '-74.0060', address: shippingAddress },
        email: { email: itemData.email, text: itemData.email },
        phone: itemData.phone,
      };

      const variables = {
        boardId: '7691216056',
        groupId: 'topics',
        itemName: 'New Order',
        columns: JSON.stringify(columnValues),
      };
      const response = await mondayClient.api(query, { variables });

      console.log('full response', response);

      return response;
    } catch (err) {
      console.log(err);
      throw new Error('Failed query item from Monday.com');
    }
  }
}

export default MondayService;
