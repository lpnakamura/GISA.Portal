export interface BpmRequest {
    id?: string;
    name: string;
    description: string;
    file: File;
    fileIdentifier?: string;
}