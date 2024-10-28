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
    console.error('error adding new fragrance:', err);
    return res.status(500).json({ message: 'Failed to add new fragrance' });
  }
}

export async function updateFragranceValue(req, res) {
  try {
    const { payload } = req.body;
    const { inputFields } = payload;
    const { itemId, columnId, columnValue } = inputFields;

    const columnTitles = {
      text5__1: 'description',
      text8__1: 'category',
      date4: 'createdDate',
      dup__of_created_date__1: 'updatedDate',
      text7__1: 'imageURL',
    };

    let attribute = '';
    let value = columnValue.value;

    for (const [id, title] of Object.entries(columnTitles)) {
      if (id === columnId) {
        attribute = title;
        if (columnId.includes('date')) {
          value = columnValue.date;
        }
        break;
      }
    }

    await db.fragrances.update({
      where: {
        id: itemId,
      },
      data: {
        [attribute]: value,
      },
    });

    return res.status(200).json({ message: 'Event processed successfully' });
  } catch (err) {
    console.error('error updating fragrance:', err);
    return res.status(500).json({ message: 'Failed to update fragrance' });
  }
}
