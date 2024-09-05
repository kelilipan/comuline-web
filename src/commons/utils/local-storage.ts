const STORAGE_KEY = "schedules";

const store = (arr: string[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
};

export const readStringArray = (): string[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as string[]) : [];
};

export const findReminder = (id: string): string | null => {
  const arr = readStringArray();
  const foundItem = arr.find((item) => item === id);
  return foundItem ?? null;
};

export const unsetReminder = (id: string): void => {
  const arr = readStringArray();
  const foundIdx = arr.indexOf(id);

  if (foundIdx !== -1) {
    arr.splice(foundIdx, 1);
    store(arr);
  } else {
    console.error("Item not found");
  }
};

export const setReminder = (id: string): void => {
  const arr = readStringArray();
  arr.push(id);
  store(arr);
};
