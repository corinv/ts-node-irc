export const splitIncomingData = (str: string): string[] => {
  const result = str.replace('\r\n', '\n').replace('\r', '').split('\n');
  result.pop(); //remove trailing empty str
  return result;
};
