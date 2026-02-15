import {atom} from "jotai"
import { Tables } from "./types/database.types"
// import { Group } from "./typs"

type Group = Tables<"groups">;

export const selectedGroupAtom = atom<Group | null>(null)