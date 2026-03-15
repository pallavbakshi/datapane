declare global {
    interface Window {
        isIPythonEmbed: boolean;
        dipLocal: boolean;
        reportProps?: any;
        dipAppRunner: boolean;
        errorHandler: any;
    }
}

export {};
