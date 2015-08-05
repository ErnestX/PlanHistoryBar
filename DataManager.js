"use strict";

MY_GLOBAL.dataManager = {
    /*
    returns fully initialized plan
    */
    getPlanAtIndex: function(index) {
        MY_GLOBAL.typeChecker.assertIsInteger(index);
        
        var newPlan = Object.create(MY_GLOBAL.planProto); //create empty plan for debugging
        var date = new Date(); // get current time and date for debugging
        
        if (index % 2 === 0) {
            newPlan.initWithFields(date, "MyLonnnnnnnngName", "google-maps.jpg", "google-maps.jpg");
        } else {
            newPlan.initWithFields(date, "MyName", "google-maps-doodled.jpg", "google-maps-doodled.jpg");
        }
        return newPlan;
    }
};
