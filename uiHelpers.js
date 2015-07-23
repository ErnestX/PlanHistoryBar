"use strict";

function highlightObject(obj) {
    if (typeof (obj) === "object") {
        obj.classList.add("selected");
        obj.classList.remove("unselected");
    } else {
        alertTypeCheckFailure(obj);
    }
}

function unHighlightObject(obj) {
    if (typeof (obj) === "object") {
        obj.classList.add("unselected");
        obj.classList.remove("selected");
    } else {
        alertTypeCheckFailure(obj);
    }
}

function moveObjectLeftToPos(obj, posFromLeft) {
    if (typeof (obj) === "object" && typeof (posFromLeft) === "number") {
        obj.style.left = posFromLeft.toString() + "px";
    } else {
        alertTypeCheckFailure(obj);
        alertTypeCheckFailure(posFromLeft);
    }
}

function getPlanAtIndex(index) {
    var img = new Image();
    img.src = "google-maps.jpg";
    return img;
}

function alertTypeCheckFailure(data) {
    console.log("type check failed: " + typeof(data));
}