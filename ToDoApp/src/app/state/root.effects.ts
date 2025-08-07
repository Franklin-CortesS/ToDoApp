import { TasksEffects } from "./effects/tasks.effects";
import { TokensEffects } from "./effects/tokens.effects";

export const rootEffects = [
  TokensEffects,
  TasksEffects
];