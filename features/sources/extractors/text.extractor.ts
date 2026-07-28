import type {
  ExtractorInput,
  ExtractorResult,
  SourceExtractor,
} from "./extractor.interface";

export class TextExtractor implements SourceExtractor {
  async extract(input: ExtractorInput): Promise<ExtractorResult> {
    const content = input.source.trim();

    const DEFAULT_TEXT_TITLE = "Untitled Text";

    return {
      title: DEFAULT_TEXT_TITLE,
      content,
      metadata: {
        length: content.length,
      },
    };
  }
}
