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
        this.assertIsString(potentialErrorMessage);
        if (typeof(data) !== 'number') {
            this.throwExceptionWithMessage(potentialErrorMessage);
        }
    }, 
    assertIsInteger: function(data, potentialErrorMessage) {
        this.assertIsString(potentialErrorMessage);
        if ((typeof(data) !== 'number') || Math.floor(data) !== data) {
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
