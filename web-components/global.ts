declare global {
    interface Window {
        isIPythonEmbed: boolean;
        dipLocal: boolean;
        reportProps?: any;
        posthog: any;
        hasPosthog: any;
        dipAppRunner: boolean;
        dipAuthorId: string;
        dipReportId: string;
        dipLocalViewEvent: any;
        Alpine: any;
        $testResources: any;
        errorHandler: any;
    }
}

export {};
