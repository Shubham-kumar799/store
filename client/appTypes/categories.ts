export interface Category {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddCategoryFormValuesType {
  name: string;
}

export interface UpdateCategoryFormValuesType {
  name: string;
}
