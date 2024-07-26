export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

export type ApiDish = Omit<Dish, "id">;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  title: string;
  price: string;
  image: string;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface ApiOrder {
  [id: string]: number;
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface OrderMutation {
  id: string;
  quantities: ApiOrder;
}

export interface DishOrder extends Dish {
  amount: number;
}

export interface DishOrders {
  dishes: DishOrder[];
  id: string;
}