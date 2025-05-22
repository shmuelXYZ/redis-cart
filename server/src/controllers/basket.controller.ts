import { NextFunction, Request, Response } from "express";
import {
  addItem,
  deleteItem,
  editItem,
  getBasket,
} from "../services/basket.service";
import axios from "axios";

export const basketController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const basket = await getBasket();
      res.status(200).json(basket);
    } catch (error) {
      next(error);
    }
  },
  /** TODO - add here more ...  */
  addItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const basket = await addItem(req.body);
      console.log("hi: ", basket);
      res.status(200).json(basket);
    } catch (error) {
      next(error);
    }
  },
  deleteItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const basket = await deleteItem(+req.params.id);
      res.status(200).json(basket);
    } catch (error) {
      next(error);
    }
  },
  editItem: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const basket = await editItem(+req.params.id, req.body);
      res.status(200).json(basket);
    } catch (error) {
      next(error);
    }
  },
  getAllProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await axios.get("https://fakestoreapi.com/products");
      if (products.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = products.data;
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
};
