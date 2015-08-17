'use strict';

MY_GLOBAL.plansContainerAnimator = {
    container: null, 
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(c);
        
        this.container = c;
    }, 
    animateShifting: function(isToLeft, callBackFunction) {
        MY_GLOBAL.typeChecker.assertIsBoolean(isToLeft);
        MY_GLOBAL.typeChecker.assertIsFunction(callBackFunction);
        
        var realCallBackFunction = function() {
            console.log
            MY_GLOBAL.plansContainerAnimator.container.css('left', '0');
            callBackFunction();
        };
        
        if (isToLeft) {
//            this.container.velocity({left: "-=83"}, 150, realCallBackFunction);
        } else {
//            this.container.velocity({left: "+=83"}, 150, realCallBackFunction);
        }
        
        callBackFunction(); // originally not here. used to test arranging without css
    }
}