var operatorChapter=$(".operator").find(".chapter");
var videoList=$(".video-list");

operatorChapter.on({
    "click":function () {
        console.log(videoList.hasClass("show"));
        var isShow=videoList.hasClass("show")?{r:-360,c:"removeClass"}:{r:0,c:"addClass"};
        videoList[isShow.c]("show").css("right",isShow.r+"px");
    }
});