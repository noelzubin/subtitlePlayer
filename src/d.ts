// srt-parser-2.d.ts

declare module 'srt-parser-2' {
    // Define the interface for an SRT item
    export interface SRTItem {
        id: string;
        startTime: string; // "00:00:11,544"
        startSeconds: number; // 11.544
        endTime: string; // "00:00:12,682"
        endSeconds: number; // 12.682
        text: string; // 'Hello'
    }

    // Define the class and its methods
    export default class SrtParser2 {
        constructor();

        // Method to convert SRT string to an array of SRT items
        fromSrt(srt: string): SRTItem[];

        // Method to convert an array of SRT items back to SRT string format
        toSrt(srtArray: SRTItem[]): string;
    }
}
