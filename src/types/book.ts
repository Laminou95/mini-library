
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  isbn?: string;
  description?: string;
  createdAt: string;
}

export interface BookFormData {
  title: string;
  author: string;
  year: number;
  isbn?: string;
  description?: string;
}
