export function exclude<T>(objects: T, fields: string[]) {
  fields.forEach((field) => {
    delete objects[field];
  });
  return objects;
}
