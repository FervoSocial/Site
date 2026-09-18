"use client";

import { createContext, useContext } from "react";

export type AtmosphereVariant = "kling" | "seedance";

export const FeedAtmosphereContext = createContext<
  ((variant: AtmosphereVariant) => void) | undefined
>(undefined);

export function useFeedAtmosphere() {
  const setAtmosphere = useContext(FeedAtmosphereContext);

  if (!setAtmosphere) {
    throw new Error("useFeedAtmosphere must be used inside the application shell");
  }

  return setAtmosphere;
}
