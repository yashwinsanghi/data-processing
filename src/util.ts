export const fetchDataTypeForGivenData = (data: Record<string, any>) => {
  const dataTypes: Record<string, string> = {};
  if (!data || !Object.keys(data).length) return dataTypes;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      dataTypes[key] = typeof data[key];
    }
  }
  return dataTypes;
};

export const areAllElementsSame = (arr: any[]) =>
  arr.every((val) => val === arr[0]);

export const findKeysByValue = <T>(obj: Record<keyof T, any>, value: any) =>
  (Object.entries(obj) as [keyof T, any][])
    .filter(([k, v]) => v === value)
    .map(([k]) => k);
