"use strict";

MY_GLOBAL.plansManager = {
    _maxNumOfLoadedPlans: 0,
    /* invariant: _rangeRight - _rangeLeft + 1 <= _maxNumOfLoadedPlans */
    _rangeLeft: 0, 
    _rangeRight: -1, 

    initWithMaxSize: function(s) {
        MY_GLOBAL.typeChecker.assertIsInteger(s);
        
        // Step1: init components
        this.previewWindowRenderer.initWithPreviewWindow($("#previewWindow"));
        this.plansRenderer.initWithContainer($("#thumbnailsBar"));
        
        // Step2: init self
        this._maxNumOfLoadedPlans = s;
        this._resetWithRangeLeft(0);
    }, 
    
    selectIndex: function(planIndex) {
        if (typeof(MY_GLOBAL.dataManager.getPlanAtIndex(planIndex)) === 'undefined') {
            return false;
        }
        
        MY_GLOBAL.typeChecker.assertIsInteger(planIndex, 'planIndex not int');
        
        // calc target range
        var targetLeft, targetRight;
        if (this._maxNumOfLoadedPlans % 2 === 0) { //even
            // ...(size/2)plans ... selectedPlan ... (size/2 - 1)plans...
            targetLeft = planIndex - (this._maxNumOfLoadedPlans/2);
            targetRight = planIndex + (this._maxNumOfLoadedPlans/2 - 1);
        } else { //odd
            // ...((size-1)/2)plans ... selectedPlan ... ((size-1)/2)plans...
            targetLeft = planIndex - (this._maxNumOfLoadedPlans-1)/2;
            targetRight = planIndex + (this._maxNumOfLoadedPlans-1)/2;
        }
//        console.log('tl:' + targetLeft.toString() + ', tr:' + targetRight.toString());
        
        // check whether the target range is within one screen
        if ((targetLeft <= this._rangeLeft) && (this._rangeLeft <= targetRight) 
            && (targetRight <= this._rangeRight)) {
            // tl...rl...tr...rr
            // Step1: remove  tr+1...rr
            var r = this._rangeRight; // have to create const r b/c _rangeRight changes within the loop when a plan gets deleted
            for (var i=targetRight+1; i<=r; i++) {
                this._tryDeletePlanAtRight();
            }
            // Step2: add tl...rl-1
            var l = this._rangeLeft;
            for (var i=targetLeft; i<=l-1; i++) {
                this._tryAddNewPlanAtLeft();
            }
            console.log('case 1');
        } else if ((this._rangeLeft <= targetLeft) && (targetLeft <= this._rangeRight) 
                   && (this._rangeRight <= targetRight)) {
            // rl...tl...rr...tr
            // Step1: remove rl...tl-1
            for (var i=this._rangeLeft; i<= targetLeft-1; i++) {
                this._tryDeletePlanAtLeft();
            }
            // Step2: add rr+1...tr
            for (var i=this._rangeRight+1; i<=targetRight; i++) {
                this._tryAddNewPlanAtRight();
            }
            console.log('case 2');
        } else if ((targetLeft >= this._rangeLeft) && (targetRight <= this._rangeRight)) {
            // rl...tl...tr...rr
            // Step1: remove rl..tl-1
            for (var i=this._rangeLeft; i<=targetLeft-1; i++) {
                this._tryDeletePlanAtLeft();
            }
            // Step2: remove tr+1...rr
            var r = this._rangeRight;
            for (var i=targetRight+1; i<=r; i++) {
                this._tryDeletePlanAtRight();
            }
            console.log('case 3');
        } else if ((this._rangeLeft >= targetLeft) && (this._rangeRight <= targetRight)) {
            // tl...rl...rr...tr
            // Step1: add tl...rl-1
            var l = this._rangeLeft;
            for (var i=targetLeft; i<=l-1; i++) {
                this._tryAddNewPlanAtLeft();
            }
            // Step2: add rr+1...tr
            for (var i=this._rangeRight+1; i<=targetRight; i++) {
                this._tryAddNewPlanAtRight();
            }
            console.log('case 4');
        } else if(targetRight <= this._rangeLeft) {
            // tl...tr...rl...rr
            this._resetWithRangeRight(targetRight);
            console.log('case 5');
        } else if(this._rangeRight <= targetLeft) {
            // rl...rr...tl...tr
            this._resetWithRangeLeft(targetLeft);
            console.log('case 6');
        }
        
        // Step3: highlight
        this.plansRenderer.unhighlightAllPlansOnScreen();
        var planIndexInOnScreen =  planIndex - this._rangeLeft;
        this.plansRenderer.highlightPlanOnScreenAtIndex(planIndexInOnScreen);
        console.log('selected ' + planIndex.toString());
        
        // Step4: render preview window
        this.previewWindowRenderer.showPreviewForPlan(MY_GLOBAL.dataManager.getPlanAtIndex(planIndex));

        return true;
    },
    
    _tryAddNewPlanAtLeft: function() {
        if (this._rangeLeft > 0) {
            var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this._rangeLeft - 1);
            if ((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
                this.plansRenderer.prependPlan(newPlan);
                this._rangeLeft--;
            }
        }
    }, 
    
    _tryAddNewPlanAtRight: function() {
        var newPlan = MY_GLOBAL.dataManager.getPlanAtIndex(this._rangeRight + 1);
        if((newPlan !== null) && (typeof(newPlan) !== 'undefined')) {
            this.plansRenderer.appendPlan(newPlan);   
            this._rangeRight++;
        }
    }, 
    
    _tryDeletePlanAtLeft: function() {
        if (this._rangeLeft <= this._rangeRight) {
            this._rangeLeft++;
            this.plansRenderer.removeHeadPlan();
        }
    }, 
    
    _tryDeletePlanAtRight: function() {
        if (this._rangeRight >= 0) {
            this._rangeRight--;
            this.plansRenderer.removeTailPlan();
        }
    }, 
    
    /* animates from left to right */
    _resetWithRangeLeft: function(rl) {
        if (rl < 0) {
            rl = 0;
        }
        // Step1: delete everything
        var r = this._rangeRight;
        for (var i=this._rangeLeft; i<=r; i++) {
            this._tryDeletePlanAtRight();
        }

        // Step2: reset ranges
        this._rangeLeft = rl;
        this._rangeRight = rl-1;

        // Step3: load
        for (var i=0; i < this._maxNumOfLoadedPlans; i++) { // try get full size
            this._tryAddNewPlanAtRight();
        }
    }, 
    
    /* animates from right to left */
    _resetWithRangeRight: function(rr) {
        // Step1: delete everything
        var r = this._rangeRight;
        for (var i=this._rangeLeft; i<=r; i++) {
            this._tryDeletePlanAtLeft();
        }

        // Step2: reset ranges
        this._rangeRight = rr;
        this._rangeLeft = rr+1;

        // Step3: load
        for (var i=0; i < this._maxNumOfLoadedPlans; i++) { // try get full size
            this._tryAddNewPlanAtLeft();
        }
    }
};
