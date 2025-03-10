const ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'],
    isResizeRequired = (oldConfig, newConfig) => {
        let { width, height } = oldConfig,
            newWidth = newConfig.width,
            newHeight = newConfig.height;

        if (width !== newWidth || height !== newHeight) {
            return true;
        }
        return false;
    },
    isChartTypeChanged = (oldConfig, newConfig) => {
        return (oldConfig.type !== newConfig.type);
    },
    cloneObject = (arg, purpose = 'clone') => {
        if ((ATOMIC_DATA_TYPE.indexOf(typeof arg) > -1) || arg === null) {
            return arg;
        }

        if (Array.isArray(arg)) {
            let i,
                len,
                arr = [];

            for (i = 0, len = arg.length; i < len; i++) {
                arr.push(cloneObject(arg[i], purpose));
            }

            return arr;
        } else if (typeof arg === 'object') {
            let cloneObj = {},
                key;

            for (key in arg) {
                if (key === 'data') {
                    if (arg[key]._dataStore) {
                        cloneObj[key] = (purpose === 'clone') ? arg[key] : '-' 
                    } else {
                        cloneObj[key] = cloneObject(arg[key], purpose);
                    }
                } else {
                    cloneObj[key] = cloneObject(arg[key], purpose);
                }
            }

            return cloneObj;
        }
    },
    isDataSourceUpdated = (oldConfig, newConfig) => {
        return JSON.stringify(cloneObject(oldConfig.dataSource, 'diff')) !== JSON.stringify(cloneObject(newConfig.dataSource, 'diff'));
    };

export {
    isResizeRequired,
    isChartTypeChanged,
    isDataSourceUpdated,
    cloneObject
};
