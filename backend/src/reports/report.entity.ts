export enum Urgency{
    IMMEDIATE,
    HIGH,
    MODERATE,
    LOW
}

export interface Report{
    id: number,
    reporterId: number,
    content: string,
    urgency: Urgency
};