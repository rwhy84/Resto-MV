if ($("#defaultLink").hasClass('active')) {
    $(".entree").removeClass("hidden");
    $(".entree").addClass("active");
}


$('.linkMenu').click(function () {

    $(".entree").removeClass("active");

    if ($(this).attr("id") == "entree") {
        $(".entree").removeClass("hidden ");
        $(".plat, .dessert").addClass("hidden");
    }
    else if ($(this).attr("id") == "plat") {
        $(".plat").removeClass("hidden");
        $(".entree, .dessert").addClass("hidden");
    }
    else if ($(this).attr("id") == "dessert") {
        $(".dessert").removeClass("hidden");
        $(".entree, .plat").addClass("hidden");
    }


})


if ($("#defaultLink").hasClass('active')) {
    $(".rouge").removeClass("hidden");
}


$('.linkMenu').click(function () {

    $(".rouge").removeClass("active");

    if ($(this).attr("id") == "rouge") {
        $(".rouge").removeClass("hidden");
        $(".blanc, .rose").addClass("hidden");
    }
    else if ($(this).attr("id") == "blanc") {
        $(".blanc").removeClass("hidden");
        $(".rouge, .rose").addClass("hidden");
    }
    else if ($(this).attr("id") == "rose") {
        $(".rose").removeClass("hidden");
        $(".rouge, .blanc").addClass("hidden");
    }


})