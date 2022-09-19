declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
}

interface Window {
    container: {
        blockchainConnector: NearConnector;
    };
}
