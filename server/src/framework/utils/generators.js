export function newID(string) {
  return `${string}-${(Math.random() + 1).toString(36).substring(2)}-${new Date().valueOf()}`;
}
