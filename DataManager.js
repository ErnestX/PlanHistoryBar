"use strict";

MY_GLOBAL.dataManager = {
    /*
    returns fully initialized plan
    */
    getPlanAtIndex: function(index) {
        MY_GLOBAL.typeChecker.assertIsInteger(index);
        
        var newPlan = Object.create(MY_GLOBAL.planProto); //create empty plan
        newPlan.initWithSrcs("google-maps.jpg", "google-maps.jpg");
        return newPlan;
    }
};
