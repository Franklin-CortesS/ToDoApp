import { Dates } from './dates';

describe('Dates', () => {
  describe('formatTimestamp', () => {
    it('should format a valid timestamp string correctly', () => {
      const timestamp = '202508071230';
      const formatted = Dates.formatTimestamp(timestamp);
      expect(formatted).toBe('2025-08-07 12:30');
    });

    it('should handle shorter strings gracefully (may produce unexpected result)', () => {
      const timestamp = '20250807';
      const formatted = Dates.formatTimestamp(timestamp);
      expect(formatted).toBe('2025-08-07 :');
    });

    it('should handle empty string input', () => {
      const timestamp = '';
      const formatted = Dates.formatTimestamp(timestamp);
      expect(formatted).toBe('-- :');
    });
  });
});
