import { Iproduct } from "../products/types";

export interface IcartItem extends Iproduct {
  quantity: number;
}

export interface IcartState {
  items: IcartItem[];
  total: number;
}
