export interface Product {
  id: number;
  name: string;
  store: number;       // foreign key as ID
  customer: number;    // foreign key as ID
  price: number;
  description: string;
  quantity: number;
  created_date: string; // date as ISO string from API
  category: number;     // foreign key as ID
  location: string;
  image_path?: string | null; // optional because it can be blank
  image_url?: string | null;  // optional because it can be blank
}
