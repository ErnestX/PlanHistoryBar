"use strict";

var MY_GLOBAL = {};

MY_GLOBAL.typeChecker = {
    assertIsString: function(data, potentialErrorMessage) {
       if (typeof(potentialErrorMessage) !== "string") {
           this.throwExceptionWithMessage('');
       } else if (typeof(data) !== 'string') {
           this.throwExceptionWithMessage(potentialErrorMessage);
       }
    }, 
    assertIsNumber: function(data, potentialErrorMessage) {
        this.assertIsString(potentialErrorMessage,'');
        if (typeof(data) !== 'number') {
            this.throwExceptionWithMessage(potentialErrorMessage);
        }
    }, 
    assertIsInteger: function(data, potentialErrorMessage) {
        this.assertIsString(potentialErrorMessage,'');
        if ((typeof(data) !== 'number') || Math.floor(data) !== data) {
            this.throwExceptionWithMessage(potentialErrorMessage);
        }
    },
    assertIsObject: function(data, potentialErrorMessage) {
        this.assertIsString(potentialErrorMessage,'');
        if (typeof(data) !== 'object') {
            this.throwExceptionWithMessage(potentialErrorMessage);
        }
    }, 
    assertIsBoolean: function(data, potentialErrorMessage) {
        this.assertIsString(potentialErrorMessage,'');
        if (typeof(data)!== 'boolean') {
            this.throwExceptionWithMessage(potentialErrorMessage);
        }
    }, 
    throwExceptionWithMessage: function(mess) {
        this.assertIsString(mess, '');
        throw {
            name: "TypeError",
            message: mess
        };
    }
};

MY_GLOBAL.assert = function(condition, potentialErrorMessage) {
    MY_GLOBAL.typeChecker.assertIsBoolean(condition,'');
    MY_GLOBAL.typeChecker.assertIsString(potentialErrorMessage,'');
    
    if (!condition) {
        throw {
            name: 'AssertionFailure', 
            message: potentialErrorMessage
        };
    }
};
