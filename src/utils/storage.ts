export function getLocalStorage(key: string) {
  return localStorage.getItem(key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
