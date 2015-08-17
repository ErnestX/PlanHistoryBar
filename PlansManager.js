"use strict";

MY_GLOBAL.plansManager = {
    thumbnailsBar: null, 
    rangeLeft: 0, 
    rangeRight: 0, 

    /*
    init this.thumbnailsBar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithBarAndRange: function(b, l, r) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(b);
        MY_GLOBAL.typeChecker.assertIsInteger(l);
        MY_GLOBAL.typeChecker.assertIsInteger(r);
        MY_GLOBAL.assert(l <= r);
        
        this.thumbnailsBar = b;
        this.rangeLeft = l;
        this.rangeRight = l - 1; //init as no plans on screen
        
        var i;
        for (i=this.rangeLeft; i <= r; i++) { // don't forget the =
            this.addNewPlanAtRight();
        }
    }, 
    
    /*
    does not move the thumbnailsBar
    */
    selectIndex: function(planIndex) {
        MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');
        
        MY_GLOBAL.plansRenderer.unhighlightAllPlansOnScreen();
        var planIndexInOnScreen =  planIndex - this.rangeLeft;
        MY_GLOBAL.plansRenderer.highlightPlanOnScreenAtIndex(planIndexInOnScreen);
    },
    
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
        this.deletePlanAtLeft();
        this.addNewPlanAtRight();
    },
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
        this.deletePlanAtRight();
        this.addNewPlanAtLeft();
    }, 
    
    addNewPlanAtLeft: function() {
        this.rangeLeft--;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft);
        
        MY_GLOBAL.plansRenderer.prependPlan(newPlan);
    }, 
    
    addNewPlanAtRight: function() {
        this.rangeRight++;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight);
//        var newPlanJQuery = MY_GLOBAL.thumbnailDivRenderer.renderDivFromPlan(newPlan);
//        MY_GLOBAL.graphsRenderer.appendDataFromPlanAndRenderAlignedWithJQuery(newPlan, newPlanJQuery);
        
        MY_GLOBAL.plansRenderer.appendPlan(newPlan);
    }, 
    
    deletePlanAtLeft: function() {
        this.rangeLeft++;
        MY_GLOBAL.plansRenderer.removeHeadPlan();
    }, 
    
    deletePlanAtRight: function() {
        this.rangeRight--;
        MY_GLOBAL.plansRenderer.removeTailPlan();
    }
};
