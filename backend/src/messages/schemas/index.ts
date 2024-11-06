import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
}
