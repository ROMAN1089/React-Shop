export interface Iproduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface IproductsState {
  items: Iproduct[];
  status: "idle" | "loading" | "failed";
}
