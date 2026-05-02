import { Request, Response } from 'express';
import Item from '../models/Item';

// 🔹 Create Item
export const createItem = async (req: any, res: Response) => {
  try {
    const item = await Item.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get All Items
export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find({ isDeleted: false }).populate('user', 'name shortId');

    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Single Item
export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name shortId');

    res.json(item);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Delete Item (soft delete)
export const deleteItem = async (req: any, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    item.isDeleted = true;
    await item.save();

    res.json({ message: 'Item deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};