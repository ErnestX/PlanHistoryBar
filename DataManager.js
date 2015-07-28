"use strict";

MY_GLOBAL.dataManager = {
    /*
    return fully initialized plan
    */
    getPlanAtIndex: function(index) {
        var newPlan = Object.create(MY_GLOBAL.planProto);
//        console.log(newPlan);
//      var img = new Image();
        newPlan.initWithThumbnail("google-maps.jpg");
//        console.log(newPlan);
        return newPlan;
    }
};
