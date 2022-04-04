export const mergeGetCategories = (existing: any[], incoming: any) => {
  const merged: any[] = existing ? existing.slice(0) : [];
  if (!Array.isArray(incoming)) {
    incoming = new Array(incoming);
  }
  incoming.forEach((category: any) => {
    merged.push(category);
  });
  return merged;
};

export const mergeGetSubCategoriesByParentId = (
  existing: any[],
  incoming: any
) => {
  const merged: any[] = existing ? existing.slice(0) : [];
  if (!Array.isArray(incoming)) {
    incoming = new Array(incoming);
  }
  incoming.forEach((category: any) => {
    merged.push(category);
  });
  return merged;
};
