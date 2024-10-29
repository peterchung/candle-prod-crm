import MondayService from '../services/monday-service';

export async function addOrder(req, res, next) {
  try {
    const token = process.env.MONDAY_API_TOKEN;
    const { itemData } = req.body;

    console.log('itemIds', itemData);

    // Use Monday's API to get the latest item
    const newOrder = await MondayService.updatedProdBoard(token, itemData);

    console.log('order added and new item id queried from board', newOrder);

    return res.status(200).json({ message: 'Order successfully added' });
  } catch (err) {
    console.error('error adding order', err);
    return res.status(500).json({ message: 'Failed to add order' });
  }
}
