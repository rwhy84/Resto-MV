if ($("#defaultLink").hasClass('active')) {
    $(".entree").removeClass("hidden");
}


$('.linkMenu').click(function () {

    $(".entree").removeClass("active");

    if ($(this).attr("id") == "entree") {
        $(".entree").removeClass("hidden");
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