// utils/genericMemo.ts
import { memo } from "react";

//TypeScript type system essentially "forgets" about the generic because memo itself is not generic-aware by default
export const genericMemo: <T>(component: T) => T = memo;
