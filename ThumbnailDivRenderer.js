MY_GLOBAL.thumbnailDivRenderer = {
    renderDivFromPlan: function(plan) {
        MY_GLOBAL.typeChecker.assertIsPlan(plan);
        
        var div = $('<div>');
        div.addClass('planDiv');
        div.addClass('unselected');
        
        var thumbanilSaveNameContainer = $('<div>');
        thumbanilSaveNameContainer.addClass('thumbanilSaveNameContainer');
        div.append(thumbanilSaveNameContainer);
        
        // render thumbnail img
        var thumbnail = $('<img>');
        thumbnail.attr('src', plan.thumbnailSrc);
        thumbnail.addClass("thumbnail");
        thumbanilSaveNameContainer.append(thumbnail);
        
        // render name
        var nameLabel = $('<p>');
        nameLabel.text(plan.saveName);
        nameLabel.addClass('saveName');
        thumbanilSaveNameContainer.append(nameLabel);
        
        // render timestamp
        var timeStampLabel = $('<p>');
        timeStampLabel.text(plan.timeStamp.getHours() + ':' + plan.timeStamp.getMinutes());
        timeStampLabel.addClass('timeStamp');
        div.append(timeStampLabel);
        
        return div;
    }
};