import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MessengerId } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const messengerLabels: Record<MessengerId, string> = {
  eric: "Eric",
  daniel: "Daniel",
  ismael: "Ismael",
  juan: "Juan",
}

export const formatMessenger = (id: MessengerId) => messengerLabels[id]
