"use strict";

MY_GLOBAL.dataManager = {
    _plansStore:[], 
    addPlanInitedWithParas: function(name, src, timeStamp) {
        MY_GLOBAL.typeChecker.assertIsString(name);
        MY_GLOBAL.typeChecker.assertIsString(src);
        MY_GLOBAL.typeChecker.assertIsString(timeStamp);
        var newDate = new Date(timeStamp);
        
        var newPlan = Object.create(MY_GLOBAL.planProto);
        newPlan.initWithFields(newDate, name, src, src);
        
        this._plansStore.push(newPlan);
    },
    
    /*
    returns fully initialized plan
    */
    getPlanAtIndex: function(index) {
        MY_GLOBAL.typeChecker.assertIsInteger(index);
        return this._plansStore[index];
    }
};
