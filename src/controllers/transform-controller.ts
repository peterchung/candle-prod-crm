import MondayService from '../services/monday-service';
import TransformationService from '../services/transformation-service';
import TRANSFORMATION_TYPES from '../constants/transformation';

// use this as an action to monday.com trigger
export async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    // TODO: Implement this function
    const { inputFields } = payload;
    const {
      boardId,
      itemId,
      sourceColumnId,
      targetColumnId,
      transformationType,
    } = inputFields;

    const text = await MondayService.getColumnValue(
      shortLivedToken,
      itemId,
      sourceColumnId
    );
    if (!text) {
      return res.status(200).send({});
    }
    const transformedText = TransformationService.transformText(
      text,
      transformationType ? transformationType.value : 'TO_UPPER_CASE'
    );
    console.log('transformed text:', transformedText);
    await MondayService.changeColumnValue(
      shortLivedToken,
      boardId,
      itemId,
      targetColumnId,
      transformedText
    );
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

export async function getRemoteListOptions(req, res) {
  try {
    return res.status(200).json({
      options: TRANSFORMATION_TYPES,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
