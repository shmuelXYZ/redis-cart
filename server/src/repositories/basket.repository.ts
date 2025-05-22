import { ONE_MONTH } from "../utils/constans";
import { RedisConnection } from "../utils/redisConnection";

interface BasketItem {
  id: number;
  quantity: number;
}

export class BasketRepository {
  private static instance: BasketRepository;
  private redisClient: RedisConnection;

  private constructor() {
    this.redisClient = RedisConnection.getInstance();
  }

  static getInstance(): BasketRepository {
    if (!BasketRepository.instance) {
      BasketRepository.instance = new BasketRepository();
    }
    return BasketRepository.instance;
  }

  async getBasket(): Promise<BasketItem[]> {
    const basket = await this.redisClient.getClient().GET("basket");
    console.log("redis basket:", basket);
    return basket ? JSON.parse(basket) : [];
  }

  private async editBasket(basket: BasketItem[]): Promise<void> {
    // after 1 month, the basket will be deleted from redis if no change
    await this.redisClient
      .getClient()
      .SETEX("basket", ONE_MONTH, JSON.stringify(basket));
  }

  //   async addItem(item: Omit<BasketItem, "quantity">): Promise<void> {
  //     const basket = await this.getBasket();
  //     const index = basket.findIndex((i) => i.id === item.id);
  //     if (index !== -1) {
  //       basket[index].quantity += 1;
  //     } else {
  //       basket.push({ ...item, quantity: 1, id: item.id });
  //     }
  //     await this.editBasket(basket);
  //   }
  async addItem(productId: number): Promise<void> {
    const basket = await this.getBasket();
    const index = basket.findIndex((i) => i.id === productId);

    if (index !== -1) {
      basket[index].quantity += 1;
    } else {
      basket.push({ id: productId, quantity: 1 });
    }

    await this.editBasket(basket);
  }

  async deleteItem(id: number): Promise<boolean> {
    const basket = await this.getBasket();
    const index = basket.findIndex((i) => i.id === id);
    if (index !== -1) {
      basket.splice(index, 1);
      await this.editBasket(basket);
      return true;
    }
    return false;
  }

  async editItem(id: number, item: BasketItem): Promise<boolean> {
    const basket = await this.getBasket();
    const index = basket.findIndex((i) => i.id === id);
    if (index !== -1) {
      basket[index] = item;
      await this.editBasket(basket);
      return true;
    }
    return false;
  }
}

export const getBasketRepository = BasketRepository.getInstance;
