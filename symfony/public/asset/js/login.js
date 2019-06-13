$(document).ready(function () {

    $('.btn').click(function () {

        /* VERIFICATION DU CHAMP EMAIL */

        var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

        if ((!regex.test($("#email").val()))) {

            $('#mailFalse').removeClass('hidden');
        }
        else {
            $('#mailTrue').removeClass('hidden');
        }

        /* VERIFICATION DU CHAMP PASSWORD */

        if ($('#password') !== "") {

            $('#passwordTrue').removeClass('hidden');
        }
        else {
            $('#passwordFalse').removeClass('hidden');
        }

    })


})