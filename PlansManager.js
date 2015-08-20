"use strict";

MY_GLOBAL.plansManager = {
    maxNumOfLoadedPlans: 0,
    /* invariant: rangeRight - rangeLeft + 1 <= maxNumOfLoadedPlans */
    rangeLeft: 0, 
    rangeRight: -1, 

    initWithMaxSize: function(s) {
        MY_GLOBAL.typeChecker.assertIsInteger(s);
        
        // Step1: init components
        this.previewWindowRenderer.initWithPreviewWindow($("#previewWindow"));
        this.plansRenderer.initWithContainer($("#thumbnailsBar"));
        
        // Step2: init self
        this.maxNumOfLoadedPlans = s;
        this.resetWithRangeLeft(0);
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
//        console.log('tl:' + targetLeft.toString() + ', tr:' + targetRight.toString());
        
        // check whether the target range is within one screen
        if ((targetLeft <= this.rangeLeft) && (this.rangeLeft <= targetRight) 
            && (targetRight <= this.rangeRight)) {
            // tl...rl...tr...rr
            // Step1: remove  tr+1...rr
            var r = this.rangeRight; // have to create const r b/c rangeRight changes within the loop when a plan gets deleted
            for (var i=targetRight+1; i<=r; i++) {
                this.tryDeletePlanAtRight();
            }
            // Step2: add tl...rl-1
            var l = this.rangeLeft;
            for (var i=targetLeft; i<=l-1; i++) {
                this.tryAddNewPlanAtLeft();
            }
            console.log('case 1');
        } else if ((this.rangeLeft <= targetLeft) && (targetLeft <= this.rangeRight) 
                   && (this.rangeRight <= targetRight)) {
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
            var r = this.rangeRight;
            for (var i=targetRight+1; i<=r; i++) {
                this.tryDeletePlanAtRight();
            }
            console.log('case 3');
        } else if ((this.rangeLeft >= targetLeft) && (this.rangeRight <= targetRight)) {
            // tl...rl...rr...tr
            // Step1: add tl...rl-1
            var l = this.rangeLeft;
            for (var i=targetLeft; i<=l-1; i++) {
                this.tryAddNewPlanAtLeft();
            }
            // Step2: add rr+1...tr
            for (var i=this.rangeRight+1; i<=targetRight; i++) {
                this.tryAddNewPlanAtRight();
            }
            console.log('case 4');
        } else if(targetRight <= this.rangeLeft) {
            // tl...tr...rl...rr
            this.resetWithRangeRight(targetRight);
            console.log('case 5');
        } else if(this.rangeRight <= targetLeft) {
            // rl...rr...tl...tr
            this.resetWithRangeLeft(targetLeft);
            console.log('case 6');
        }
        
        // Step3: highlight
        this.plansRenderer.unhighlightAllPlansOnScreen();
        var planIndexInOnScreen =  planIndex - this.rangeLeft;
        this.plansRenderer.highlightPlanOnScreenAtIndex(planIndexInOnScreen);
        console.log('selected ' + planIndex.toString());
        
        // Step4: render preview window
        this.previewWindowRenderer.showPreviewForPlan(MY_GLOBAL.dataManager.getPlanAtIndex(planIndex));

        return true;
    },
    
    tryAddNewPlanAtLeft: function() {
        if (this.rangeLeft > 0) {
            var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeLeft - 1);
            if ((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
                this.plansRenderer.prependPlan(newPlan);
                this.rangeLeft--;
            }
        }
    }, 
    
    tryAddNewPlanAtRight: function() {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this.rangeRight + 1);
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
            this.plansRenderer.appendPlan(newPlan);   
            this.rangeRight++;
        }
    }, 
    
    tryDeletePlanAtLeft: function() {
        if (this.rangeLeft <= this.rangeRight) {
            this.rangeLeft++;
            this.plansRenderer.removeHeadPlan();
        }
    }, 
    
    tryDeletePlanAtRight: function() {
        if (this.rangeRight >= 0) {
            this.rangeRight--;
            this.plansRenderer.removeTailPlan();
        }
    }, 
    
    /* animates from left to right */
    resetWithRangeLeft: function(rl) {
        if (rl < 0) {
            rl = 0;
        }
        // Step1: delete everything
        var r = this.rangeRight;
        for (var i=this.rangeLeft; i<=r; i++) {
            this.tryDeletePlanAtRight();
        }

        // Step2: reset ranges
        this.rangeLeft = rl;
        this.rangeRight = rl-1;

        // Step3: load
        for (var i=0; i < this.maxNumOfLoadedPlans; i++) { // try get full size
            this.tryAddNewPlanAtRight();
        }
    }, 
    
    /* animates from right to left */
    resetWithRangeRight: function(rr) {
        // Step1: delete everything
        var r = this.rangeRight;
        for (var i=this.rangeLeft; i<=r; i++) {
            this.tryDeletePlanAtLeft();
        }

        // Step2: reset ranges
        this.rangeRight = rr;
        this.rangeLeft = rr+1;

        // Step3: load
        for (var i=0; i < this.maxNumOfLoadedPlans; i++) { // try get full size
            this.tryAddNewPlanAtLeft();
        }
    }
};
