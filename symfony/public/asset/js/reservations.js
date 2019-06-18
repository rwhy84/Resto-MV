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

        createDateCard(nextMonthSelector, i, formatDate(new Date(y, m + 1, i)), frenchDate(new Date(y, m + 1, i)), dayIndex(new Date(y, m + 1, i)), frenchDayAndMonth(new Date(y, m + 1, i)));

    }
    /*
        for (i = nbDaysInPreviousMonth; i < nbDaysInPreviousMonth; i++) {
    
            createDateCard(currentMonthSelector, i, frenchDate(new Date(y, m, i)), dayIndex(new Date(y, m - 1, i)), frenchDayAndMonth(new Date(y, m, i)));
    
        }
    */


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
        $('#date' + i).attr('onclick', "return false");

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

    function compterDatesVides(jour) {

        if (jour === 1) {

            date = 0;

        } else if (jour === 0) {

            date = 6;

        } else {

            for (i = 0; i < jour; i++) {
                date = i;
            }
        }
        return date;
    }

    var nbDatesVidesM = compterDatesVides(firstDay);

    var nbDatesVidesMNext = compterDatesVides(firstDayNextMonth);

    function inserCaseEmptyAfter(nbDays, selector, element, dateVide) {

        // MOIS DE 31 JOURS
        if (nbDays === 31) {
            if (dateVide <= 4) {
                totalCases = 35;
            } else if (dateVide > 4) {
                totalCases = 42;
            }

            // MOIS DE 30 JOURS        
        } else if (nbDays === 30) {
            if (dateVide <= 5) {
                totalCases = 35;

            } else if (dateVide > 5) {
                totalCases = 42;
            }

            // MOIS DE 29 JOURS
        } else if (nbDays === 29) {
            totalCases = 35;

            // MOIS DE 28 JOURS  
        } else if (nbDays === 28) {
            if (dateVide === 0) {
                totalCases = 28;
            } else if (datevide > 0) {
                totalCases = 35;
            }
        }

        var soust = nbDays + dateVide;

        var limit = totalCases - soust;

        for (i = 0; i < limit; i++) {

            $(selector).append(element);
        }
    }

    inserCaseEmptyAfter(nbDaysInCurrentMonth, currentMonthSelector, emptyDate, nbDatesVidesM);
    inserCaseEmptyAfter(nbDaysInNextMonth, nextMonthSelector, emptyDate, nbDatesVidesMNext);

    $('#date').click(function () {

        $("#calendar").removeClass('hidden hiddenSmall').addClass("transitionCal");
    })


    $('.dateContainer').click(function () {

        event.preventDefault();

        var dateSelect = $(this).children().attr('id');

        //$("#calendar").addClass('hiddenSmall');

        if (($(this).hasClass('passed')) || ($(this).hasClass('forbidden'))) {

        } else {
            $('#date').val(dateSelect);
            $("#calendar").addClass('hiddenSmall');
        }

        if (($(this).hasClass('Lundi')) || ($(this).hasClass('Mardi')) || ($(this).hasClass('Mercredi')) || ($(this).hasClass('Jeudi'))) {

            $("#14h15, #14h30, #22h15, #22h30, #22h45, #23h00").addClass("hidden");

        } else if (($(this).hasClass('Vendredi')) || ($(this).hasClass('Samedi'))) {

        } else if ($(this).hasClass('Dimanche')) {

            $("#diner").addClass('hidden');
        }
    })

    // On désactive les dates qui ont les classes "midi-close" et"soir-close"

    for (i = 0; i < listDateCont.length; i++) {
        if ($(listDateCont[i]).hasClass("midi-close" && "soir-close")) {
            $(listDateCont[i]).addClass("forbidden");
        } else {

        }
    }


    var hDate = new Date();
    var currentHour = hDate.getHours();
    var currentMinutes = hDate.getMinutes();

    console.log(currentHour);
    console.log(currentMinutes);

    for (h = 12; h < 14; h++) {

        if ((currentHour >= h) && (currentHour < h + 1)) {
            if (currentMinutes > 45) {
                $("#" + h + "h45", "#" + h + "h30", "#" + h + "h15", "#" + h + "h00").addClass("hidden");
                console.log("sup a 45!")
            } else if (currentMinutes >= 30) {
                $("#" + h + "h30", "#" + h + "h15", "#" + h + "h00").addClass("hidden");
                console.log("sup a 30!")
            } else if (currentMinutes >= 15) {
                $("#" + h + "h15", "#" + h + "h00").addClass("hidden");
                console.log("sup a 15!")
            } else {
                $("#" + h + "h00").addClass("hidden");
                console.log('sup a ', h, '00!');
            }
        } else {

        };
    }

    for (h = 20; h < 23; h++) {

        if ((currentHour >= h) && (currentHour < h + 1)) {
            if (currentMinutes > 45) {
                $("#" + h + "h45", "#" + h + "h30", "#" + h + "h15", "#" + h + "h00").addClass("hidden");
                console.log("sup a 45!")
            } else if (currentMinutes >= 30) {
                $("#" + h + "h30", "#" + h + "h15", "#" + h + "h00").addClass("hidden");
                console.log("sup a 30!")
            } else if (currentMinutes >= 15) {
                $("#" + h + "h15", "#" + h + "h00").addClass("hidden");
                console.log("sup a 15!")
            } else {
                $("#" + h + "h00").addClass("hidden");
                console.log('sup a ', h, '00!');
            }
        } else {

        };
    }

})