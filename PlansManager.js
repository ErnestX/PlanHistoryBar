"use strict";

MY_GLOBAL.plansManager = {
    maxNumOfLoadedPlans: 0,
    /* invariant: rangeRight - rangeLeft + 1 <= maxNumOfLoadedPlans */
    rangeLeft: 0, 
    rangeRight: -1, 

    /*
    init this.thumbnailsBar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithMaxSize: function(s) {
        MY_GLOBAL.typeChecker.assertIsInteger(s);
        this.maxNumOfLoadedPlans = s;

        for (var i=0; i < s; i++) { // try get full size
            this.tryAddNewPlanAtRight();
        }
    }, 
    
    selectIndex: function(planIndex) {
        if (typeof(MY_GLOBAL.dataManager.getPlanAtIndex(planIndex)) === 'undefined') {
            return false;
        }
        
        MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');
        
        // calc target range
        var targetLeft, targetRight;
        if (this.maxNumOfLoadedPlans % 2 === 0) { //even
            // ...(size/2)plans ... selectedPlan ... (size/2 - 1)plans...
            targetLeft = planIndex - (this.maxNumOfLoadedPlans/2);
            targetRight = planIndex + (this.maxNumOfLoadedPlans/2 - 1);
        } else { //odd
            // ...((size-1)/2)plans ... selectedPlan ... ((size-1)/2)plans...
            targetLeft = planIndex - (this.maxNumOfLoadedPlans-1)/2;
            targetRight = planIndex + (this.maxNumOfLoadedPlans-1)/2;
        }
        console.log('tl:' + targetLeft.toString() + ', tr:' + targetRight.toString());
        
        // check whether the target range is within one screen
        if ((targetLeft <= this.rangeLeft) && (this.rangeLeft <= targetRight) && (targetRight <= this.rangeRight)) {
            // tl...rl...tr...rr
            // Step1: remove  tr+1...rr
            for (var i=targetRight+1; i<=this.rangeRight; i++) {
                this.tryDeletePlanAtRight();
            }
            // Step2: add tl...rl-1
            for (var i=targetLeft; i<=this.rangeLeft-1; i++) {
                this.tryAddNewPlanAtLeft();
            }
            console.log('case 1');
        } else if ((this.rangeLeft <= targetLeft) && (targetLeft <= this.rangeRight) && (this.rangeRight <= targetRight)) {
            // rl...tl...rr...tr
            // Step1: remove rl...tl-1
            for (var i=this.rangeLeft; i<= targetLeft-1; i++) {
                this.tryDeletePlanAtLeft();
            }
            // Step2: add rr+1...tr
            for (var i=this.rangeRight+1; i<=targetRight; i++) {
                this.tryAddNewPlanAtRight();
            }
            console.log('case 2');
        } else if ((targetLeft >= this.rangeLeft) && (targetRight <= this.rangeRight)) {
            // rl...tl...tr...rr
            // Step1: remove rl..tl-1
            for (var i=this.rangeLeft; i<=targetLeft-1; i++) {
                this.tryDeletePlanAtLeft();
            }
            // Step2: remove tr+1...rr
            for (var i=targetRight+1; i<=this.rangeRight; i++) {
                this.tryDeletePlanAtRight();
            }
            console.log('case 3');
        } else if ((this.rangeLeft >= targetLeft) && (this.rangeRight <= targetRight)) {
            // tl...rl...rr...tr
            // Step1: add tl...rl-1
            for (var i=targetLeft; i<=this.rangeLeft-1; i++) {
                this.tryAddNewPlanAtLeft();
            }
            // Step2: add rr+1...tr
            for (var i=this.rangeRight+1; i<=targetRight; i++) {
                this.tryAddNewPlanAtRight();
            }
            console.log('case 4');
        } else if(targetRight <= this.rangeLeft) {
            // tl...tr...rl...rr
            this.resetWithRangeLeft(targetLeft);
            console.log('case 5');
        } else if(this.rangeRight <= targetLeft) {
            // rl...rr...tl...tr
            this.resetWithRangeLeft(targetLeft);
            console.log('case 6');
        }
        
        // Step3: highlight
//        if ((planIndex <= this.rangeRight) && (planIndex >= this.rangeLeft)) {
            MY_GLOBAL.plansRenderer.unhighlightAllPlansOnScreen();
            var planIndexInOnScreen =  planIndex - this.rangeLeft;
            MY_GLOBAL.plansRenderer.highlightPlanOnScreenAtIndex(planIndexInOnScreen);
            console.log('selected' + planIndex.toString());
        
            return true;
//        }
//        return false;
    },
    
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
        this.tryAddNewPlanAtRight();
        this.tryDeletePlanAtLeft();
        console.log('l:' + this.rangeLeft.toString() + ',' + 'r:' + this.rangeRight.toString());
    },
    /*
    moves the thumbnailsBar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
        this.tryAddNewPlanAtLeft();
        this.tryDeletePlanAtRight();
        console.log('l:' + this.rangeLeft.toString() + ',' + 'r:' + this.rangeRight.toString());
    }, 
    
    tryAddNewPlanAtLeft: function() {
        if (this.rangeLeft > 0) {
            var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft - 1);
            if ((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
                MY_GLOBAL.plansRenderer.prependPlan(newPlan);
                this.rangeLeft--;
            }
        }
    }, 
    
    tryAddNewPlanAtRight: function() {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight + 1);
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
            MY_GLOBAL.plansRenderer.appendPlan(newPlan);   
            this.rangeRight++;
        }
    }, 
    
    tryDeletePlanAtLeft: function() {
        // only when at full size
        if (this.rangeRight - this.rangeLeft > this.maxNumOfLoadedPlans - 1) { // should not delete when euqal to size
            this.rangeLeft++;
            MY_GLOBAL.plansRenderer.removeHeadPlan();
        }
    }, 
    
    tryDeletePlanAtRight: function() {
        // only when at full size
        if (this.rangeRight - this.rangeLeft > this.maxNumOfLoadedPlans - 1) { // should not delete when euqal to size
            this.rangeRight--;
            MY_GLOBAL.plansRenderer.removeTailPlan();
        }
    }, 
    
    resetWithRangeLeft: function(rl) {
        MY_GLOBAL.assert(rl >= 0);
        // Step1: delete everything
        for (var i=this.rangeLeft; i<=this.rangeRight; i++) {
            this.tryDeletePlanAtRight();
        }
        
        // Step2: reset ranges
        this.rangeLeft = rl;
        this.rangeRight = rl-1;
        
        // Step3: load
        for (var i=0; i < this.maxNumOfLoadedPlans; i++) { // try get full size
            this.tryAddNewPlanAtRight();
        }
    }
};
