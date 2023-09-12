import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
//ONLY FOR TEST PURPOSES
export const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8080";
export const SECRET_KEY = process.env.SECRET_KEY ?? "lZ90c8UR16OFZC5mM+6Vdg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

