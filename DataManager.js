"use strict";

MY_GLOBAL.dataManager = {
    /*
    returns fully initialized plan
    */
    getPlanAtIndex: function(index) {
        MY_GLOBAL.typeChecker.assertIsInteger(index);
        
        var newPlan = Object.create(MY_GLOBAL.planProto); //create empty plan
        if (index % 2 === 0) {
            newPlan.initWithSrcs("google-maps.jpg", "google-maps.jpg");
        } else {
            newPlan.initWithSrcs("google-maps-doodled.jpg", "google-maps-doodled.jpg");
        }
        return newPlan;
    }
};
