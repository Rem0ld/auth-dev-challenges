import { user } from "@prisma/client";

interface IReader<T> {
  getCount(): Promise<number>;
  findAll(
    limit: number,
    skip: number,
    rest?: Record<string, any>
  ): Promise<Result<TResultService<T>, Error>>;
  findById(id: string): Promise<Result<T, Error>>;
}

interface IWriter<T> {
  create(data: Omit<T, "id">): Promise<Result<T, Error>>;
  createMany?(data: Partial<T>[]): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<Result<T, Error>>;
  delete(id: string): Promise<Result<null, Error>>;
}

export type BaseRepository<T> = IReader<T> & IWriter<T>;

export interface IService<T> {
  getCount(): Promise<number>;
  findAll(
    limit: string,
    skip: string,
    rest?: Record<string, any>
  ): Promise<Result<TResultService<Partial<T>>, Error>>;
  findById(id: string): Promise<Result<Partial<T>, Error>>;
  create(data: Partial<T>): Promise<Result<Partial<T>, Error>>;
  createMany?(data: Partial<T>[]): Promise<Partial<T[]>>;
  update(id: string, data: Partial<T>): Promise<Result<Partial<T>, Error>>;
  delete(id: string): Promise<Result<null, Error>>;
}

export type Result<T, E> = [T | null, E | null];

export type TResultService<T> = {
  total: number;
  data: T[];
};

export type TProtectedUser = Omit<user, "password">;

export type Tcredentials = {
  id: string;
  email: string;
  password: string;
};
