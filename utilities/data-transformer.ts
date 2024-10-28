function toCamelCase(title) {
  return title
    .split(' ')
    .map((word, index) => {
      word = word.toLowerCase();
      if (index > 0) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join('');
}

export function transformData(data) {
  const output = {
    item: data.name,
  };

  for (const column of data.column_values) {
    const attributeName = toCamelCase(column.column.title);

    if (column.value === null) {
      output[attributeName] = null;
      continue;
    }

    try {
      const parsedValue = JSON.parse(column.value);
      output[attributeName] = parsedValue.date || parsedValue;
    } catch {
      output[attributeName] = column.value.replace(/^"|"$/g, '');
    }
  }
  return output;
}
