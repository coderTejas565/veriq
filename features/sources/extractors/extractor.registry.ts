import type { SourceExtractor } from "./extractor.interface";
import { withExtractorResilience } from "./with-extractor-resilience";
import { TextExtractor } from "./text.extractor";

import type { SourceType } from "../types";

const extractors: Partial<Record<SourceType, SourceExtractor>> = {
  TEXT: withExtractorResilience(new TextExtractor()),
};

export function getExtractor(type: SourceType): SourceExtractor {
  const extractor = extractors[type];

  if (!extractor) {
    throw new Error(`No extractor registered for source type: ${type}`);
  }

  return extractor;
}