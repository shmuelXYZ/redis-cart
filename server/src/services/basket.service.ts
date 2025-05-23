import { getBasketRepository } from "../repositories/basket.repository";

const getBasket = async (): Promise<any[]> => {
  try {
    const basketRepository = getBasketRepository();
    console.log(basketRepository);
    return await basketRepository.getBasket();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const addItem = async (item: any) => {
  try {
    const basketRepository = getBasketRepository();
    await basketRepository.addItem(item.id);
    return await basketRepository.getBasket();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteItem = async (id: number) => {
  try {
    const basketRepository = getBasketRepository();
    const isDeleted = await basketRepository.deleteItem(id);
    if (!isDeleted) {
      throw new Error("Item not found");
    }
    return await basketRepository.getBasket();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const editItem = async (id: number, item: any) => {
  try {
    const basketRepository = getBasketRepository();
    await basketRepository.editItem(id, item);
    return await basketRepository.getBasket();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getBasket, addItem, deleteItem, editItem };
