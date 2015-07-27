"use strict";

var barManager = {
    bar: null, 
    rangeLeft: 0, 
    rangeRight: 0, 
    
    /*
    init this.bar, this.rangeLeft, this.rangeRight and place the plans
    */
    initWithBarAndRange: function(b, l, r) {
        this.bar = b;
        this.rangeLeft = l;
        this.rangeRight = r;
        
        var i;
        for (i=this.rangeLeft; i < this.rangeRight; i++) {
            var img = getPlanAtIndex(i);
            initPlan(img);
            this.bar.append(img);
        }   
    }, 
    
    /*
    does not move the bar
    */
    selectIndex: function(planIndex) {
        // unselect all plans on screen
        this.bar.children().removeClass("selected");
        this.bar.children().addClass("unselected");
        // select plan
        this.bar.children().eq(planIndex - this.rangeLeft).removeClass("unselected");
        this.bar.children().eq(planIndex - this.rangeLeft).addClass("selected");
            
        console.log("select #" + planIndex.toString());
    },
    
    /*
    moves the bar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarLeftByOnePlan: function() {
        this.bar.addClass("leftShiftting");
        this.bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            barManager.deletePlanAtLeft();
            barManager.addNewPlanAtRight();
            barManager.bar.removeClass("leftShiftting");
        });
    },
    /*
    moves the bar with animation. Adds and deletes plans so that the number of plans on screen stays the same
    */
    moveBarRightByOnePlan: function() {
        this.bar.addClass("rightShiftting");
        this.bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            barManager.deletePlanAtRight(); //"this" no longer works here
            barManager.addNewPlanAtLeft();
            barManager.bar.removeClass("rightShiftting");
        });   
    }, 
    
    addNewPlanAtLeft: function() {
        var newImg = getPlanAtIndex(this.rangeLeft - 1);
        initPlan(newImg);
        this.bar.prepend(newImg);
        this.rangeLeft--;
    }, 
    addNewPlanAtRight: function() {
        var newImg = getPlanAtIndex(this.rangeRight + 1);
        initPlan(newImg);
        this.bar.append(newImg);
        this.rangeRight++;
    }, 
    deletePlanAtLeft: function() {
        this.bar.children().eq(0).remove();
        this.rangeLeft++;
    }, 
    deletePlanAtRight: function() {
        this.bar.children().last().remove();
        this.rangeRight--;
    }
};
