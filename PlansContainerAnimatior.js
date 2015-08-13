'use strict';

MY_GLOBAL.plansContainerAnimator = {
    container: null, 
    initWithContainer: function(c) {
        MY_GLOBAL.typeChecker.assertIsObject(c);
        
        this.container = c;
    }, 
    animateShifting: function(isToLeft, callBackFunction) {
        MY_GLOBAL.typeChecker.assertIsBoolean(isToLeft);
        // TODO: check is function
        
        if (isToLeft) {
            this.container.addClass("leftShiftting");
        } else {
            this.container.addClass("rightShiftting");
        }
        
        this.container.one('animationend', callBackFunction());
    }
}