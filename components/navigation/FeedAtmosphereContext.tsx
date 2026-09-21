"use client";

import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FeedViewId } from "@/lib/feed-placeholder";

export type AtmosphereVariant = "kling" | "seedance" | "hailuo";

type FeedAtmosphereContextValue = {
  activeView: FeedViewId;
  setActiveView: Dispatch<SetStateAction<FeedViewId>>;
};

export const FeedAtmosphereContext = createContext<FeedAtmosphereContextValue | undefined>(undefined);

export function useFeedView() {
  const context = useContext(FeedAtmosphereContext);

  if (!context) {
    throw new Error("useFeedView must be used inside the application shell");
  }

  return context;
}
