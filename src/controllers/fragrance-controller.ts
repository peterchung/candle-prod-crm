import MondayService from '../services/monday-service';
import db from '../../utilities/db';
import { transformData } from '../../utilities/data-transformer';

export async function addNewFragrance(req, res) {
  try {
    const { shortLivedToken } = req.session;
    const { payload } = req.body;
    const { inputFields } = payload;
    const { itemId } = inputFields;

    const newEntry = {
      id: itemId,
      item: '',
    };

    // Use Monday's API to get the latest item
    const itemData = await MondayService.getItemName(shortLivedToken, itemId);
    const columnValues = transformData(itemData[0]);

    for (const [attribute, val] of Object.entries(columnValues)) {
      newEntry[attribute] = val;
    }

    await db.fragrances.create({ data: newEntry });

    return res.status(200).json({ message: 'Fragrance successfully added' });
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

    return res.status(200).json({ message: 'Fragrance successfully updated' });
  } catch (err) {
    console.error('error updating fragrance:', err);
    return res.status(500).json({ message: 'Failed to update fragrance' });
  }
}

export async function deleteFragrance(req, res) {
  try {
    const { challenge, event } = req.body;

    if (challenge) {
      return res.status(200).json({ challenge });
    }

    if (event) {
      const itemId = event.itemId;
      await db.fragrances.delete({
        where: {
          id: itemId,
        },
      });
    }

    return res.status(200).json({ message: 'Fragrance successfully deleted' });
  } catch (err) {
    console.error('error deleting fragrance:', err);
    return res.status(500).json({ message: 'Failed to delete fragrance' });
  }
}

export async function getAllFragrances(req, res, next) {
  try {
    const fragranceList = await db.fragrances.findMany();
    const returnData = {};
    for (const fragrance of fragranceList) {
      returnData[fragrance.id.toString()] = fragrance.item;
    }

    res.locals.data = returnData;
    next();
  } catch (err) {
    console.error('error retrieving fragrance data', err);
    return res
      .status(500)
      .json({ message: 'Failed to get list of fragrances' });
  }
}
