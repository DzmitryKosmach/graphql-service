export const replaceIdAndToJson = (data: any) => {
  const dataString = JSON.stringify(data);
  const replasedString = dataString.replace(/_id"/g, 'id"');
  return JSON.parse(replasedString);
};
