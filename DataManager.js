"use strict";

MY_GLOBAL.dataManager = {
    /*
    return fully initialized plan
    */
    getPlanAtIndex: function(index) {
        var newPlan = Object.create(MY_GLOBAL.planProto);
        newPlan.initWithThumbnail("google-maps.jpg");
        return newPlan;
    }
};
