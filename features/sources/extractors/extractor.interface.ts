export interface ExtractorInput {
  /**
   * Original source identifier.
   * Examples:
   * - PDF file path
   * - Website URL
   * - YouTube URL
   * - Raw text
   */
  source: string;
}

export interface ExtractorResult {
  /**
   * Human-readable title if available.
   */
  title: string;

  /**
   * Extracted plain text.
   */
  content: string;

  /**
   * Optional metadata specific to the source.
   * Example:
   * - author
   * - page count
   * - duration
   * - language
   */
  metadata?: Record<string, unknown>;
}

export interface SourceExtractor {
  extract(input: ExtractorInput): Promise<ExtractorResult>;
}
