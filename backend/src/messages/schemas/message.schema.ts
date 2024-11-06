import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '.';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: User, required: true })
  user: User;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
