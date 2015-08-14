"use strict";

MY_GLOBAL.plansManager = {
    plansBar: null, 
    rangeLeft: 0, 
    rangeRight: 0, 
    
    /*
    init this.plansBar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithBarAndRange: function(b, l, r) {
        MY_GLOBAL.typeChecker.assertIsJQueryObject(b);
        MY_GLOBAL.typeChecker.assertIsInteger(l);
        MY_GLOBAL.typeChecker.assertIsInteger(r);
        MY_GLOBAL.assert(l <= r);
        
        this.plansBar = b;
        this.rangeLeft = l;
        this.rangeRight = l - 1; //init as no plans on screen
        
        var i;
        for (i=this.rangeLeft; i <= r; i++) { // don't forget the =
            this.addNewPlanAtRight();
        }
        
        console.log("left: "+ this.rangeLeft.toString());
        console.log("right: " + this.rangeRight.toString());
    }, 
    
    /*
    does not move the plansBar
    */
    selectIndex: function(planIndex) {
        MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');
        
        // unselect all plans on screen
        this.plansBar.children().removeClass("selected");
        this.plansBar.children().addClass("unselected");
        // select plan
        this.plansBar.children().eq(planIndex - this.rangeLeft).removeClass("unselected");
        this.plansBar.children().eq(planIndex - this.rangeLeft).addClass("selected");
        
        console.log("select #" + planIndex.toString());
    },
    
    /*
    moves the plansBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
        this.deletePlanAtLeft();
        this.addNewPlanAtRight();
    },
    /*
    moves the plansBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
        this.deletePlanAtRight();
        this.addNewPlanAtLeft();
    }, 
    
    addNewPlanAtLeft: function() {
        this.rangeLeft--;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft);
        
        this.plansBar.prepend(MY_GLOBAL.thumbnailGroupRenderer.renderDivFromPlan(newPlan));
        
        console.log("left: "+ this.rangeLeft.toString());
    }, 
    
    addNewPlanAtRight: function() {
        this.rangeRight++;
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight);
        var newPlanJQuery = MY_GLOBAL.thumbnailGroupRenderer.renderDivFromPlan(newPlan);
        this.plansBar.append(newPlanJQuery);
        MY_GLOBAL.graphsRenderer.appendDataFromPlanAndRenderToAlignWithJQuery(newPlan, newPlanJQuery);
        
        console.log("right: " + this.rangeRight.toString());
    }, 
    
    deletePlanAtLeft: function() {
        this.rangeLeft++;
        this.plansBar.children().eq(0).remove();
        console.log("left: "+ this.rangeLeft.toString());
    }, 
    
    deletePlanAtRight: function() {
        this.rangeRight--;
        this.plansBar.children().last().remove();
        console.log("right: " + this.rangeRight.toString());
    }
};
