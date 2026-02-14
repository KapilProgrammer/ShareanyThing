import {atom} from "jotai"
import { Group } from "./typs"

export const selectedGroupAtom = atom<Group | null>(null)