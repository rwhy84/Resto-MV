$(document).ready(function () {

    /* CRÉATIONS DES DATES */

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


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
    /*var beginningDate = frenchDate(new Date(2019, 00, 1));

    console.log(beginningDate);*/

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
    console.log("nbcurrent", nbDaysInCurrentMonth);
    var nbDaysInNextMonth = getNbJoursMois(m + 1, y);
    var nbDaysInPreviousMonth = getNbJoursMois(m - 1, y);

    /* CRÉATION DES CARTES DE DATES DANS LES SLIDER */

    var dateCard = "";
    var currentMonthSelector = $("#currentMonth"); // SLIDE DU MOIS ACTUEL
    var nextMonthSelector = $('#nextMonth'); // SLIDE DU MOIS SUIVANT

    var createDateCard = function (card, id, format, date, day, idTitle) {

        dateCard = `
                <a href="#" class="dateContainer ` + day + `` + format + `" id="date` + id + `" data-date="` + format + `">
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

        createDateCard(currentMonthSelector, i, formatDate(new Date(y, m, i)), frenchDate(new Date(y, m, i)), dayIndex(new Date(y, m, i)), frenchDayAndMonth(new Date(y, m, i)));

    }

    //CREATION DES CARTES DU MOIS SUIVANT
    for (i = 1; i < nbDaysInNextMonth + 1; i++) {

        createDateCard(nextMonthSelector, i, formatDate(new Date(y, m, i)), frenchDate(new Date(y, m + 1, i)), dayIndex(new Date(y, m, i + 1)), frenchDayAndMonth(new Date(y, m, i)));

    }

    for (i = nbDaysInPreviousMonth; i < nbDaysInPreviousMonth; i++) {

        createDateCard(currentMonthSelector, i, frenchDate(new Date(y, m, i)), dayIndex(new Date(y, m - 1, i)), frenchDayAndMonth(new Date(y, m, i)));

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

    // Création d'une case vide
    var emptyDate = `
                    <a href="#" class="disabledLink" onclick="return false"><h5></h5></a>
    `;

    // On récupère l'index du jour de la semaine de la première date du mois et la date du dernier jour
    var dateCalendar = new Date(y, m, 1);
    var firstDay = dateCalendar.getDay();
    var lastDay = dateCalendar.getDate();

    console.log("firstDay", firstDay)

    // Idem pour mois +1
    var dateCalendarNextMonth = new Date(y, m + 1, 1);
    var firstDayNextMonth = dateCalendarNextMonth.getDay();

    // Et la derniere date du mois -1
    var dateCalendarPreviousMonth = new Date(y, m - 1, nbDaysInPreviousMonth);
    var lastDatePreviousMonth = dateCalendarPreviousMonth.getDate();

    // Création d'une fonction pour compter les jours passés et désactiver les dates sur le calendrier

    tmp = date2 - date1

    function dateDiff(date1, date2) {
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;

        tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes

        tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes

        tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures

        tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
        diff.day = tmp;

        return diff;
    }

    today = new Date(y, m, d);

    diff = dateDiff(dateCalendar, today);

    var disableDate = diff.day;

    // Désactivation des dates passées dans le calendrier

    for (i = 0; i < disableDate + 1; i++) {

        $('#date' + i).addClass('passed');

    }

    var emptyDate = `<a href="#" class="disabledLink" onclick="return false"><h5 class="previousDateDisabled"></h5></a>`;

    // On ajoute aux cases de dates des classes correspondant au statut OUVERT / FERME du jour

    var listDateCont = $(".dateContainer");

    var listDateBDD = $('#BDDRECAP').children();

    for (i = 0; i < listDateCont.length; i++) {
        for (a = 0; a < listDateBDD.length; a++) {

            if ($(listDateCont[i]).attr('data-date') == $(listDateBDD[a]).attr("id")) {
                //console.log("VRAI: ", i);

                var statut = $(listDateBDD[a]).attr("class");

                $(listDateCont[i]).addClass(statut);
            } else {

            }

        }
    }

    // Création des cases vides au début et à la fin du calendar en fonction du premier jour du mois

    var dateVid;

    function insertEmptyBefore(selector, jour, element) {

        //var dateCalendar = new Date(y, m, 1);
        //jour = date.getDay();

        if (jour === 1) {

            dateVide = 0;

        } else if (jour === 0) {

            dateVide = 6;

        } else {

            for (i = 0; i < jour; i++) {
                dateVide = i;
            }
        }

        for (i = 0; i < dateVide; i++) {

            $(selector).prepend(element);

        }
        return dateVide;
    }

    insertEmptyBefore(currentMonthSelector, firstDay, emptyDate);
    insertEmptyBefore(nextMonthSelector, firstDayNextMonth, emptyDate);

    console.log("dateVide", dateVide);
    console.log("firstDayNextMont: ", firstDayNextMonth);

    var totalCases;

    function compterDatesVides(date, jour) {

        var dateEnd;

        var dateCalendar = new Date(y, m, d);
        var date = dateCalendar.getDay();

        if (jour === 1) {

            date = 0;

        } else if (jour === 0) {

            date = 6;

        } else {

            for (i = 0; i < jour; i++) {
                date = i;
            }
        }
        return dateEnd;
    }

    var firstMonth = new Date(y, m + 1, 1);
    dateEnd = compterDatesVides(firstMonth, firstDayNextMonth);

    console.log("functionDateVides: ", dateVide);


    function inserCaseEmptyAfter(nbDays, selector, dateVid, element, jour) {

        console.log("dateVide", dateVide);

        if (jour === 1) {

            dateVid = 0;

        } else if (jour === 0) {

            dateVid = 6;

        } else {

            for (i = 0; i < jour; i++) {
                dateVid = i;
            }
        }

        // MOIS DE 31 JOURS
        if ((nbDays === 31) && (dateVid <= 4)) {
            totalCases = 35;
            console.log("totalCases1: ", totalCases)
            console.log("dateVide1: ", dateVid);
        } else if ((nbDays === 31) && (dateVid > 4)) {
            totalCases = 42;
            console.log("totalCases2: ", totalCases)
            console.log("dateVide2: ", dateVid);
            // MOIS DE 30 JOURS
        } else if ((nbDays === 30) && (dateVid <= 5)) {
            totalCases = 35;
            console.log("totalCases3: ", totalCases)
            console.log("dateVide3: ", dateVid);
        } else if ((nbDays === 30) && (dateVid > 5)) {
            totalCases = 42;
            console.log("totalCases4: ", totalCases)
            console.log("dateVide4: ", dateVid);
            // MOIS DE 29 JOURS
        } else if (nbDays === 29) {
            totalCases = 35;
            console.log("totalCases5: ", totalCases)
            console.log("dateVide5: ", dateVid);
            // MOIS DE 28 JOURS
        } else if ((nbDays === 28) && (dateVid === 0)) {
            totalCases = 28;
            console.log("totalCases6: ", totalCases)
            console.log("dateVide6: ", dateVid);
        } else if ((nbDays === 28) && (datevid > 0)) {
            totalCases = 35;
            console.log("totalCases7: ", totalCases)
            console.log("dateVide7: ", dateVid);
        }

        console.log("totalCases: ", totalCases);
        console.log("nbDays: ", nbDays);
        var soust = nbDays + dateVid;

        for (i = 0; i = (totalCases - soust); i++) {

            $(selector).append(element);

        }

    }

    console.log("dateVidelast: ", dateVide);

    inserCaseEmptyAfter(nbDaysInCurrentMonth, currentMonthSelector, dateVide, emptyDate, firstDay);
    inserCaseEmptyAfter(nbDaysInNextMonth, nextMonthSelector, /*dateVide*/ emptyDate, firstDayNextMonth);

    console.log("firstDayNextMonth: ", firstDayNextMonth);

    $('#date').click(function () {

        $("#calendar").removeClass('hidden');
    })


    $('.dateContainer').click(function () {

        event.preventDefault();

        var dateSelect = $(this).children().attr('id');

        $("#calendar").addClass('hiddenSmall');

        if ($(this).hasClass('passed')) {

        } else {
            $('#date').val(dateSelect);
        }


        if (($(this).hasClass('Lundi')) || ($(this).hasClass('Mardi')) || ($(this).hasClass('Mercredi')) || ($(this).hasClass('Jeudi'))) {

            $("#14h15, #14h30, #22h15, #22h30, #22h45, #23h00").addClass("hidden");

        } else if (($(this).hasClass('Vendredi')) || ($(this).hasClass('Samedi'))) {

        } else if ($(this).hasClass('Dimanche')) {

            $("#diner").addClass('hidden');

        }
    })



    $(".dateContainer").each(function () {

        var dateContCount = $(".dateContainer");

        if (dateContCount)
            console.log(dateContCount);
        /*
         if(hasClass("midi-close")) {
     }).
 
         $("#date25").addClass("forbidden");
         console.log("true");
 
     } else {
         console.log("false");*/
    })


})