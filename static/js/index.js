$(function () {

    $('#banner-show').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });
    /* Banner */
    var bannerNav = $("#banner-nav-list").find("div.item");
    var bannerSub = $("#banner-nav-sub").find(".banner-nav-sub");

    bannerNav.on({
        mouseenter: function () {
            var dataId = $(this).attr("data-id");
            bannerSub.each(
                function () {
                    $(this).css("display", "none");
                });
            $("#banner-nav-sub").find(".banner-nav-sub[data-id=" + dataId + "]").css("display", "block");
        },
        mouseleave: function () {
            bannerSub.each(function () {
                $(this).css("display", "none");
            })
        }
    });

    bannerSub.on({
        mouseenter: function () {
            $(this).css("display", "block")
        },
        mouseleave: function () {
            bannerSub.each(function () {
                $(this).css("display", "none");
            })
        }
    });

});