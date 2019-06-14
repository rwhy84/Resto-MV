$(document).ready(function () {

    /* CRÉATIONS DES DATES */

    var dateFront = new Date(),
        d = dateFront.getDate(),
        m = dateFront.getMonth(),
        y = dateFront.getFullYear();

    // Création d'une fonction de conversion de la date au format FR (numéro du mois)
    function frenchDate(dateFront) {

        var dayNumBack = dateFront.getDate();

        return dayNumBack;
    }

    // Création d'une fonction de conversion des dates en format FR jour / date / mois
    function frenchDayAndMonth(dateFront) {

        var monthsBack = [' Janvier ', ' Février ', ' Mars ', ' Avril ', ' Mai ', ' Juin ', ' Juillet ',
            ' Août ', ' Septembre ', ' Octobre ', ' Novembre ', ' Décembre '];
        var dayNameBack = ['Dimanche ', 'Lundi ', 'Mardi ', 'Mercredi ', 'Jeudi ', 'Vendredi ', 'Samedi '];
        var dayNumBack = dateFront.getDate();

        return dayNameBack[dateFront.getDay()] + dayNumBack + monthsBack[dateFront.getMonth()];
    }

    // Si on veut la date du jour : frenchDate(new Date(y, m, d));

    // Définition d'une date de départ fixe(le 1 Janvier 2019)
    var beginningDate = frenchDate(new Date(2019, 00, 1));

    console.log(beginningDate);

    //Création d'une fonction calculant le nombre de jours dans un mois
    function getNbJoursMois(mois, annee) {
        var lgMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((annee % 4 == 0 && annee % 100 != 0) || annee % 400 == 0) {
            lgMois[1] = 29;
        }
        return lgMois[mois];

    }

    //Nombre de jours mois actuel et mois suivant
    var nbDaysInCurrentMonth = getNbJoursMois(m, y);
    var nbDaysInNextMonth = getNbJoursMois(m + 1, y);

    console.log(nbDaysInCurrentMonth);
    console.log(nbDaysInNextMonth);

    /* CRÉATION DES CARTES DE DATES DANS LES SLIDER */

    var dateCard = "";
    var currentMonthSelector = $("#currentMonth"); // SLIDE DU MOIS ACTUEL
    var nextMonthSelector = $('#nextMonth'); // SLIDE DU MOIS SUIVANT

    var createDateCard = function (card, id, date, day, idTitle) {

        dateCard = `
                <a href="#" class="dateContainer ` + day + `" id="date` + id + `">
                    <h5 id="` + idTitle + `">` + date + `</h5>
                </a>`;

        $(card).append(dateCard);

    }

    // On récupère le jour de la semaine pour l'utiliser comme classe sur les cases du calendrier
    function dayIndex(dateFront) {

        var dayNameBack = ['Dimanche ', 'Lundi ', 'Mardi ', 'Mercredi ', 'Jeudi ', 'Vendredi ', 'Samedi '];

        return dayNameBack[dateFront.getDay()]
    }

    //CREATION DES CARTES DU MOIS ACTUEL
    for (i = 1; i < nbDaysInCurrentMonth + 1; i++) {

        createDateCard(currentMonthSelector, i, frenchDate(new Date(y, m, i)), dayIndex(new Date(y, m, i)), frenchDayAndMonth(new Date(y, m, i)));

    }

    //CREATION DES CARTES DU MOIS SUIVANT
    for (i = 1; i < nbDaysInNextMonth + 1; i++) {

        createDateCard(nextMonthSelector, i, frenchDate(new Date(y, m + 1, i)), dayIndex(new Date(y, m, i + 1)), frenchDayAndMonth(new Date(y, m, i)));

    }

    /* FIN CRÉATION DES CARTES DE DATES */

    /* CRÉATION DU TITRE DU SLIDER (NOM DU MOIS) */

    var whatMonth = new Date()
    var tab_month = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
    var next_month = new Array("Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier");
    console.log(tab_month[whatMonth.getMonth()]);
    console.log(next_month[whatMonth.getMonth()]);

    //MOIS ACTUEL PAR DEFAUT SUR LE PREMIER SLIDE
    $('.calHeadSlider').children('h3').text(tab_month[whatMonth.getMonth()]);

    //CHANGEMENT ENTRE MOIS ACTUEL ET MOIS SUIVANT AU CLIC
    $('.carousel-control-prev, .carousel-control-next').click(function () {

        if ($("#currentMonth").hasClass("currentMonthActive")) {

            $('.calHeadSlider').children('h3').text(next_month[whatMonth.getMonth()]);
            $("#currentMonth").removeClass("currentMonthActive").addClass('hidden');
            $('#nextMonth').addClass('nextMonthActive').removeClass('hidden');

        } else {

            $('.calHeadSlider').children('h3').text(tab_month[whatMonth.getMonth()]);
            $('#currentMonth').addClass("currentMonthActive").removeClass('hidden');
            $('#nextMonth').removeClass('nextMonthActive').addClass('hidden');

        }

    })

    /* FIN TITRE SLIDER */

    var emptyDate = `
                    <a href="#" class="disabledLink"></a>
    `;

    // On récupère l'index du jour de la semaine de la première date du mois
    var dateCalendar = new Date(y, m, 1);
    var firstDay = dateCalendar.getDay();

    console.log("firstDay: ", firstDay);

    var dateCalendar = new Date(y, m + 1, 1);
    var firstDayNextMonth = dateCalendar.getDay();

    console.log("firstDayNextMonth: ", firstDayNextMonth);

    // Création des cases vides au début et à la fin du calendar en fonction du premier jour du mois et du nombre de jours dans le mois

    // IMPORTANT: SI 30 JOURS

    if (firstDay === 0) {
        for (i = 0; i < 6; i++) {
            $(currentMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 6; i++) {
            $(currentMonthSelector).append(emptyDate);
        }
    } else if (firstDay === 1) {
        for (i = 0; i < 0; i++) {
            $(currentMonthSelector).append(emptyDate);
        }
    } else if (firstDay === 2) {
        for (i = 0; i < 1; i++) {
            $(currentMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 4; i++) {
            $(currentMonthSelector).append(emptyDate);
        }
    } else if (firstDay === 3) {
        for (i = 0; i < 2; i++) {
            $(currentMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 3; i++) {
            $(currentMonthSelector).append(emptyDate);
        }
    } else if (firstDay === 4) {
        for (i = 0; i < 3; i++) {
            $(currentMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 2; i++) {
            $(currentMonthSelector).append(emptyDate);
        }
    } else if (firstDay === 5) {
        for (i = 0; i < 4; i++) {
            $(currentMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 1; i++) {
            $(currentMonthSelector).append(emptyDate);
        }
    } else if (firstDay === 6) {
        for (i = 0; i < 5; i++) {
            $(currentMonthSelector).prepend(emptyDate);

        }
    }

    // SI MOIS DE 31 JOURS

    if (firstDayNextMonth === 0) {
        for (i = 0; i < 6; i++) {
            $(nextMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 6; i++) {
            $(nextMonthSelector).append(emptyDate);
        }
    } else if (firstDayNextMonth === 1) {
        for (i = 0; i < 4; i++) {
            $(nextMonthSelector).append(emptyDate);
        }
    } else if (firstDayNextMonth === 2) {
        for (i = 0; i < 1; i++) {
            $(nextMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 3; i++) {
            $(nextMonthSelector).append(emptyDate);
        }
    } else if (firstDayNextMonth === 3) {
        for (i = 0; i < 2; i++) {
            $(nextMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 2; i++) {
            $(nextMonthSelector).append(emptyDate);
        }
    } else if (firstDayNextMonth === 4) {
        for (i = 0; i < 3; i++) {
            $(nextMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 1; i++) {
            $(nextMonthSelector).append(emptyDate);
        }
    } else if (firstDayNextMonth === 5) {
        for (i = 0; i < 4; i++) {
            $(nextMonthSelector).prepend(emptyDate);
        }
    } else if (firstDayNextMonth === 6) {
        for (i = 0; i < 5; i++) {
            $(nextMonthSelector).prepend(emptyDate);
        }
        for (i = 0; i < 5; i++) {
            $(nextMonthSelector).append(emptyDate);
        }
    }

    $('#date').click(function () {

        $("#calendar").removeClass('hidden');
    })


    $('.dateContainer').click(function () {

        event.preventDefault();

        var dateSelect = $(this).children().attr('id');

        $("#calendar").addClass('hiddenSmall');

        $('#date').val(dateSelect); // On ajoute la date cliquée dans l'input
        /*$('#dateRecap').addClass("validRecap");

      $("#calendar").addClass('hidden');*/ // On masque le calendar

        /*$("#selectHour, #formResa").removeClass("hidden");*/

        if (($(this).hasClass('Lundi')) || ($(this).hasClass('Mardi')) || ($(this).hasClass('Mercredi')) || ($(this).hasClass('Jeudi'))) {

            $("#14h15, #14h30, #22h15, #22h30, #22h45, #23h00").addClass("hidden");

        } else if (($(this).hasClass('Vendredi')) || ($(this).hasClass('Samedi'))) {

        } else if ($(this).hasClass('Dimanche')) {

            $("#diner").addClass('hidden');

        }
    })

    /*$('#heureRepas').change(function () {

        event.preventDefault();

        var heureRecap = $(this).val();

        $('#heureRecap').append(heureRecap); // On ajoute l'heure choisie dans le menu récap
        $('#heureRecap').addClass("validRecap");

        $("#selectHour").addClass('hidden');

        $("#moreEaters").removeClass('hidden');

    })

    $('#eatersSelect').change(function () {

        event.preventDefault();

        var eatersRecap = $(this).val();

        $('#nbClientsRecap').append(eatersRecap);
        $('#nbClientsRecap').addClass("validRecap");

        $("#moreEaters").addClass('hidden');

        $('.publicInputs').removeClass('hidden');

    })*/














})