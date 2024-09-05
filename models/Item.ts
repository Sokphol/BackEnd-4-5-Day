import mongoose, { Document, Schema } from 'mongoose';

interface IItem extends Document {
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Item = mongoose.model<IItem>('Item', ItemSchema);

export default Item;
