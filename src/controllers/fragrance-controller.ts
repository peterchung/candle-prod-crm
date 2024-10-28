import MondayService from '../services/monday-service';
import db from '../../utilities/db';

export async function addNewFragrance(req, res) {
  try {
    const { shortLivedToken } = req.session;
    const { payload } = req.body;
    const { inputFields } = payload;
    const { itemId } = inputFields;

    // Use Monday's API to get the latest item
    const itemName = await MondayService.getItemName(shortLivedToken, itemId);
    const newEntry = {
      id: itemId,
      item: itemName[0],
    };

    await db.fragrances.create({ data: newEntry });

    return res.status(200).json({ message: 'Event processed successfully' });
  } catch (err) {
    console.error('Webhook callback error:', err);
    return res.status(500).json({ message: 'Failed to process webhook event' });
  }
}
