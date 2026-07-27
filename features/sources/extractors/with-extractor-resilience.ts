import type {
  ExtractorInput,
  ExtractorResult,
  SourceExtractor,
} from "./extractor.interface";

export function withExtractorResilience(
  extractor: SourceExtractor,
): SourceExtractor {
  return {
    async extract(
      input: ExtractorInput,
    ): Promise<ExtractorResult> {
      try {
        return await extractor.extract(input);
      } catch (error) {
        console.error(
          `[Extractor Error] ${extractor.constructor.name}`,
          error,
        );

        throw new Error(
          `${extractor.constructor.name} extraction failed`,
          {
            cause: error,
          },
        );
      }
    },
  };
}