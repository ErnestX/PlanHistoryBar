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
//            this.container.addClass("leftShiftting");
//            this.container.one('animationend', function() {
//                MY_GLOBAL.plansContainerAnimator.container.removeClass("leftShiftting");
//            });
            this.container.velocity({left: "-=83"}, 150, realCallBackFunction);
        } else {
//            this.container.addClass("rightShiftting");
//            this.container.one('animationend', function() {
//                MY_GLOBAL.plansContainerAnimator.container.removeClass("rightShiftting");
//            });
            this.container.velocity({left: "+=83"}, 150, realCallBackFunction);
        }
//        this.container.css('left', 0);
//        this.container.one('animationend', callBackFunction); // NOTE: do not write callBackFunction()!!! 
    }
}