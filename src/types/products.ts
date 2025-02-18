export interface BaseProduct {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: string;
  stock: number;
  created_at: string;
}

export interface Book extends BaseProduct {
  author: string;
  publisher: string;
  isbn: string;
}

export interface Clothing extends BaseProduct {
  size: string;
  color: string;
  material: string;
}

export interface Phone extends BaseProduct {
  brand: string;
  model: string;
  storage: string;
  ram: string;
}

export type Product = Book | Clothing | Phone;

export type ProductsResponse = Product[];
