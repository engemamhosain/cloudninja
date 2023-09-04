import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerCategoryModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoryModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoryModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoryModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CategoryModel = LazyLoading extends LazyLoadingDisabled ? EagerCategoryModel : LazyCategoryModel

export declare const CategoryModel: (new (init: ModelInit<CategoryModel>) => CategoryModel) & {
  copyOf(source: CategoryModel, mutator: (draft: MutableModel<CategoryModel>) => MutableModel<CategoryModel> | void): CategoryModel;
}

type EagerProductModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProductModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly message?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductModel = LazyLoading extends LazyLoadingDisabled ? EagerProductModel : LazyProductModel

export declare const ProductModel: (new (init: ModelInit<ProductModel>) => ProductModel) & {
  copyOf(source: ProductModel, mutator: (draft: MutableModel<ProductModel>) => MutableModel<ProductModel> | void): ProductModel;
}

type EagerEventModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EventModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly message?: string | null;
  readonly date?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEventModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<EventModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly message?: string | null;
  readonly date?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EventModel = LazyLoading extends LazyLoadingDisabled ? EagerEventModel : LazyEventModel

export declare const EventModel: (new (init: ModelInit<EventModel>) => EventModel) & {
  copyOf(source: EventModel, mutator: (draft: MutableModel<EventModel>) => MutableModel<EventModel> | void): EventModel;
}