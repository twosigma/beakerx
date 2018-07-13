declare const bkCoreManager: {
    _bkAppImpl: {
        getBeakerObject: () => {
            beakerObj: {
                prefs: {
                    outputColumnLimit: number;
                    outputLineLimit: number;
                    theme: {
                        name: string;
                        plotColors: string[];
                    };
                };
            };
        };
    };
    _prefs: {
        getTheme: () => any;
    };
    getTheme: () => any;
    getBkApp: () => any;
};
export default bkCoreManager;
