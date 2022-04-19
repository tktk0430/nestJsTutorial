export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  status: TItemStatus;
}

export type TItemStatus = 'ON_SALE' | 'SOLD_OUT';
