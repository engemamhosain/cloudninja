// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CategoryModel, ProductModel, EventModel } = initSchema(schema);

export {
  CategoryModel,
  ProductModel,
  EventModel
};