"use strict";

MY_GLOBAL.plansManager = {
//    thumbnailsBar: null, 
    size: 0,
    rangeLeft: 0, 
    rangeRight: -1, 

    /*
    init this.thumbnailsBar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithSize: function(s) {
        MY_GLOBAL.typeChecker.assertIsInteger(s);
        
        
//        this.thumbnailsBar = b;
        this.size = s;
        
//        for (var i=this.rangeLeft; i < s; i++) { // don't forget the =
        for (var i=0; i < s; i++) { // try get full size
            this.tryAddNewPlanAtRight();
            console.log('trying');
        }
    }, 
    
    /*
    does not move the thumbnailsBar
    */
    selectIndex: function(planIndex) {
        if ((planIndex <= this.rangeRight) && (planIndex >= this.rangeLeft)) {
            MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');

            MY_GLOBAL.plansRenderer.unhighlightAllPlansOnScreen();
            var planIndexInOnScreen =  planIndex - this.rangeLeft;
            MY_GLOBAL.plansRenderer.highlightPlanOnScreenAtIndex(planIndexInOnScreen);
            console.log('selected' + planIndex.toString());
            return true;
        }
        return false;
    },
    
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
//        if (this.tryAddNewPlanAtRight()) {
        this.tryAddNewPlanAtRight();
        this.tryDeletePlanAtLeft();
//        }
    },
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
//        if (this.tryAddNewPlanAtLeft()) {
        this.tryAddNewPlanAtLeft();
        this.tryDeletePlanAtRight();
//        }
    }, 
    
//    /* return true if success */
    tryAddNewPlanAtLeft: function() {
        if (this.rangeLeft > 0) {
            var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft - 1);
            if ((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
                MY_GLOBAL.plansRenderer.prependPlan(newPlan);
                this.rangeLeft--;
    //            return true;
            }
    //        return false;
        }
    }, 
//    /* return true if success */
    tryAddNewPlanAtRight: function() {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight + 1);
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
            MY_GLOBAL.plansRenderer.appendPlan(newPlan);   
            this.rangeRight++;
            console.log('added');
//            return true;
        }
//        return false;
    }, 
    
    tryDeletePlanAtLeft: function() {
        // only when at full size
        if (this.rangeRight - this.rangeLeft >= this.size - 1) {
            this.rangeLeft++;
            MY_GLOBAL.plansRenderer.removeHeadPlan();
        }
    }, 
    
    tryDeletePlanAtRight: function() {
        // only when at full size
        if (this.rangeRight - this.rangeLeft >= this.size - 1) {
            this.rangeRight--;
            MY_GLOBAL.plansRenderer.removeTailPlan();
        }
    }
    
    
    
    
    
//    tryIncreaseRangeRight: function() {
//       this.rangeRight++; 
//    }, 
//    tryDecreaseRangeRight: function() {
//        // only when at full size
//        if (this.rangeRight - this.rangeLeft > this.size) {
//            this.rangeRight--;
//        }
//    },
//    tryIncreaseRangeLeft: function() {
//        // only when at full size
//        if (this.rangeRight - this.rangeLeft > this.size) {
//            this.rangeLeft++;
//        }
//    }, 
//    tryDecreaseRangeLeft: function() {
//        if (this.rangeLeft > 0) {
//            this.rangeLeft--;
//        }
//    }
};
