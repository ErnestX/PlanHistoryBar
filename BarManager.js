"use strict";

var barManager = {
    rangeLeft: 0, 
    rangeRight: 9, 
    initBar: function(b) {
        this.bar = b;
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
            console.log(this.deletePlanAtLeft);
            this.deletePlanAtLeft();
            this.addNewPlanAtRight();
            this.bar.removeClass("leftShiftting");
        });
    }, 
    moveBarRightByOnePlan: function() {
        this.bar.addClass("rightShiftting");
        this.bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            this.deletePlanAtRight();
            this.addNewPlanAtLeft();
            this.bar.removeClass("rightShiftting");
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
//
///*
//does not move the bar
//*/
//BarManager.prototype.selectIndex = function(planIndex) 
//{
//    // unselect all plans on screen
//    this.bar.children().removeClass("selected");
//    this.bar.children().addClass("unselected");
//    // select plan
//    this.bar.children().eq(planIndex - this.rangeLeft).removeClass("unselected");
//    this.bar.children().eq(planIndex - this.rangeLeft).addClass("selected");
//            
//    console.log("select #" + planIndex.toString());
//}
//
///*
//moves the bar with animation. Adds and deletes plans so that the number of plans on screen stays the same
//*/
//BarManager.prototype.moveBarLeftByOnePlan = function()
//{
//    this.bar.addClass("leftShiftting");
//    this.bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
//        console.log(this.deletePlanAtLeft);
//        this.deletePlanAtLeft();
//        this.addNewPlanAtRight();
//        this.bar.removeClass("leftShiftting");
//    });
//}
//
///*
//moves the bar with animation. Adds and deletes plans so that the number of plans on screen stays the same
//*/
//BarManager.prototype.moveBarRightByOnePlan = function()
//{
//    this.bar.addClass("rightShiftting");
//    this.bar.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
//        BarManager.prototype.deletePlanAtRight();
//        BarManager.prototype.addNewPlanAtLeft();
//        this.bar.removeClass("rightShiftting");
//    });   
//}
//
//BarManager.prototype.addNewPlanAtLeft = function()
//{
//    var newImg = getPlanAtIndex(this.rangeLeft - 1);
//    initPlan(newImg);
//    this.bar.prepend(newImg);
//    this.rangeLeft--;
//}
//
//BarManager.prototype.addNewPlanAtRight = function() {
//    var newImg = getPlanAtIndex(this.rangeRight + 1);
//    initPlan(newImg);
//    this.bar.append(newImg);
//    this.rangeRight++;
//}
//
//BarManager.prototype.deletePlanAtLeft = function() {
//    this.bar.children().eq(0).remove();
//    this.rangeLeft++;
//}
//
//BarManager.prototype.deletePlanAtRight = function() {
//    this.bar.children().last().remove();
//    this.rangeRight--;
//}
