"use strict";

var MY_GLOBAL = {};

MY_GLOBAL.typeChecker = {
    assertIsString: function(data, potentialErrorMessage) {
       if (typeof(data) !== 'string') {
           this.throwTypeExceptionWithMessage(data, 'string', potentialErrorMessage);
       }
    }, 
    assertIsNumber: function(data, potentialErrorMessage) {
        if (typeof(data) !== 'number') {
            this.throwTypeExceptionWithMessage(data, 'number', potentialErrorMessage);
        }
    }, 
    assertIsInteger: function(data, potentialErrorMessage) {
        if ((typeof(data) !== 'number') || Math.floor(data) !== data) {
            this.throwTypeExceptionWithMessage(data, 'integer', potentialErrorMessage);
        }
    },
    assertIsFunction: function(data, potentialErrorMessage) {
        if (typeof(data) !== 'function') {
            this.throwTypeExceptionWithMessage(data, 'object', potentialErrorMessage);
        }
    }, 
    assertIsObjectWithProto: function(data, proto, potentialErrorMessage) {
        if (!(proto.isPrototypeOf(data))) {
            this.throwTypeExceptionWithMessage(data, proto.toString(), potentialErrorMessage);
        }
    }, 
    assertIsJQueryObject: function(data, potentialErrorMessage) {
        if (!(data instanceof jQuery)) {
            this.throwTypeExceptionWithMessage(data, 'jQuery', potentialErrorMessage);
        }
    }, 
    assertIsBoolean: function(data, potentialErrorMessage) {
        if (typeof(data)!== 'boolean') {
            this.throwTypeExceptionWithMessage(data, 'boolean', potentialErrorMessage);
        }
    }, 
    assertIsDate: function(data, potentialErrorMessage) {
       if (!(data instanceof Date)) {
           this.throwTypeExceptionWithMessage(data, 'Date', potentialErrorMessage);
       } 
    }, 
    assertIsPlan: function(data, potentialErrorMessage) {
       if (!(MY_GLOBAL.planProto.isPrototypeOf(data))) {
           this.throwTypeExceptionWithMessage(data, 'Plan', potentialErrorMessage);
       } 
    }, 
    throwTypeExceptionWithMessage: function(value, targetType, mess) {
        this.assertIsString(targetType);
        if (typeof(mess) !== 'undefined') {
            throw 'TypeError: ' + value.toString() +' is not of ' + targetType + ' (' + mess.toString() + ')';
        } else if(typeof(value) !== 'undefined'){
            throw 'TypeError: ' + value.toString() +' is not of ' + targetType;
        } else {
            throw 'TypeError: undefined' +' is not of ' + targetType;
        }
    }
};

MY_GLOBAL.assert = function(condition, potentialErrorMessage) {
    MY_GLOBAL.typeChecker.assertIsBoolean(condition);
    
    if (!condition) {
        if (typeof(potentialErrorMessage) !== 'undefined') {
            throw 'AssertionFailure: ' + potentialErrorMessage.toString();
        } else {
            throw 'AssertionFailure';
        }
    }
};
