import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export const tryCatch = async <T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
};

const doMath = async () => {
  const value = Math.random();
  if (value > 0.5) throw new Error("too large");
  return value;
};

const demo = async () => {
  const { data: someData, error: someError } = await tryCatch(doMath());
  if (someError) return { error: "unable to process" };
  const { data: moreData, error: moreError } = await tryCatch(doMath());
  if (moreError) return { error: "unable to process more" };
  someData + moreData;
};

interface CustomError {
  message: string;
  code: number;
}

const customDemo = async () => {
  const { data: customData, error: customError } = await tryCatch<number, CustomError>(
    doMath()
  );
  if (customError) return { error: "unable to process" };
  customData;
};
