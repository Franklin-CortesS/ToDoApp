export class Dates {
  static formatTimestamp(timestamp: string) {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hour = timestamp.substring(8, 10);
    const minute = timestamp.substring(10, 12);
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
}