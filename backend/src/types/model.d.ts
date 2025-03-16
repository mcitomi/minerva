import { type Content } from "@google/generative-ai";

export type ModelJson = {
    name: string;
    identity: string;
    tune: Content[]
}