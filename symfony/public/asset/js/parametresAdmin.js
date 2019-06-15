$(document).ready(function () {

    /* CRÉATIONS DES DATES */

    var dateBack = new Date(),
        d = dateBack.getDate(),
        m = dateBack.getMonth(),
        y = dateBack.getFullYear();

    // Création d'une fonction de conversion des dates en format FR jour / date / mois / année
    function frenchDate(dateBack) {

        var monthsBack = [' Janvier ', ' Février ', ' Mars ', ' Avril ', ' Mai ', ' Juin ', ' Juillet ',
            ' Août ', ' Septembre ', ' Octobre ', ' Novembre ', ' Décembre '];
        var dayNameBack = ['Dimanche ', 'Lundi ', 'Mardi ', 'Mercredi ', 'Jeudi ', 'Vendredi ', 'Samedi '];
        var dayNumBack = dateBack.getDate();

        return dayNameBack[dateBack.getDay()] + dayNumBack + monthsBack[dateBack.getMonth()];
    }

    function monthOnly(dateBack) {

        var monthsBack = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

        return monthsBack[dateBack.getMonth()];
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

    var createDateCard = function (card, id, date, mois) {

        dateCard = `
        <div class="dayParam">

        <div class="firstRow">

            <div class="spaceBlock">
                <div class="dateContainer">
                    <h5>`+ date + `</h5>
                </div>
            </div>

            <div class="firstLabelCont">

                <h5 class="openLabel defaultActive" id="openLabelMidi`+ mois + id + `">OUVERT</h5>

                <h5 class="closeLabel" id="closeLabelMidi`+ mois + id + `">FERMÉ</h5>

            </div>
        </div>

        <div class="midiParam generalParam">

            <h3>MIDI</h3>

            <div class="buttonContainer">
                <div class="railClose" id="railCloseMidi`+ id + `"></div>
                <button class="btn buttonParam btnOpen" id="buttonMidi`+ id + `" data-miDay="Midi` + mois + id + `"><i class="fas fa-bars defaultActive iconBtn" id="iconeMidi` + id + `"></i></button>
                <div class="railOpen" id="railOpenMidi`+ id + `"></div>
            </div>


        </div>

        <div class="secondRow">

            <div class="spaceBlock">
            </div>

            <div class="labelCont">

                <h5 class="openLabel defaultActive" id="openLabelSoir`+ mois + id + `">OUVERT</h5>

                <h5 class="closeLabel" id="closeLabelSoir`+ mois + id + `">FERMÉ</h5>

            </div>
        </div>

        <div class="soirParam generalParam">

            <h3>SOIR</h3>

            <div class="buttonContainer">
                <div class="railClose" id="railCloseSoir`+ id + `"></div>
                <button class="btn buttonParam btnOpen" id="buttonSoir`+ id + `"data-miDay="Soir` + mois + id + `"><i class="fas fa-bars defaultActive iconBtn" id="iconeSoir` + id + `"></i></button>
                <div class="railOpen" id="railOpenSoir`+ id + `"></div>
            </div>


        </div>
    </div>`;

        $(card).append(dateCard);

    }

    //CREATION DES CARTES DU MOIS ACTUEL
    for (i = 1; i < nbDaysInCurrentMonth + 1; i++) {

        createDateCard(currentMonthSelector, i, frenchDate(new Date(y, m, i)), monthOnly(new Date(y, m, i)));

    }

    //CREATION DES CARTES DU MOIS SUIVANT
    for (i = 1; i < nbDaysInNextMonth + 1; i++) {

        createDateCard(nextMonthSelector, i, frenchDate(new Date(y, m + 1, i)), monthOnly(new Date(y, m + 1, i)));

    }

    /* FIN CRÉATION DES CARTES DE DATES */

    /* CRÉATION DU TITRE DU SLIDER (NOM DU MOIS) */

    var whatMonth = new Date()
    var tab_month = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
    var next_month = new Array("Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier");
    console.log(tab_month[whatMonth.getMonth()]);
    console.log(next_month[whatMonth.getMonth()]);

    //MOIS ACTUEL PAR DEFAUT SUR LE PREMIER SLIDE
    $('.topControls').children('h3').text(tab_month[whatMonth.getMonth()]);

    //CHANGEMENT ENTRE MOIS ACTUEL ET MOIS SUIVANT AU CLIC
    $('.carousel-control-prev, .carousel-control-next').click(function () {

        if ($("#currentMonth").hasClass("currentMonthActive")) {

            $('.topControls').children('h3').text(next_month[whatMonth.getMonth()]);
            $("#currentMonth").removeClass("currentMonthActive");
            $('#nextMonth').addClass('nextMonthActive');

        } else {

            $('.topControls').children('h3').text(tab_month[whatMonth.getMonth()]);
            $('#currentMonth').addClass("currentMonthActive");
            $('#nextMonth').removeClass('nextMonthActive');

        }

    })

    /* FIN TITRE SLIDER */

    /* ANIMATIONS BOUTONS GLISSANTS */

    $('.buttonParam').click(function () {

        var miDay = $(this).attr('data-miDay');
        console.log(miDay);

        var nbRailOpen = $(this).next('.railOpen');

        var nbRailClose = $(this).prev('.railClose');

        var icon = $(this).children('.iconBtn');

        var nbLabelClose = $(this).closest(".generalParam");/*.children('.closeLabel');*/

        console.log(nbLabelClose);

        var nbLabelOpen = $(this).closest(".generalParam");/*.children('.openLabel');*/

        console.log(nbLabelOpen);

        if ($(this).hasClass('btnOpen')) {

            //MODIFICATION DES CLASSES POUR DECLENCHER L'ANIMATION DU BOUTON COULISSANT
            $(this).removeClass('btnOpen').addClass("btnClose");

            // ATTRIBUTION AUTOMATIQUE D'UNE VALEUR AUX INPUT MASQUÉS EN FONCTION DE LA POSITION DES BOUTONS (OUVERT / FERMÉ)
            // $(this).parent().next("input").val('close');

            //MODIFICATION DES CLASSES POUR DECLENCHER L'ANIMATION DES RAILS
            $(nbRailOpen).removeClass('openStatutRight').addClass('closeStatutRight');
            $(nbRailClose).removeClass('closeStatutLeft').addClass('openStatutLeft');

            //MODIFICATION DES CLASSES POUR MODIFIER LA COULEUR DE L'ICONE SUR LE BOUTON
            $(icon).removeClass('defaultActive blueIcon').addClass('orangeIcon');

            //MODIFICATION DES CLASSES POUR CHANGER LA COULEUR DES LABELS
            $('#closeLabel' + miDay).removeClass('inactive blueLabel').addClass('orangeLabel');
            $('#openLabel' + miDay).removeClass('defaultActive blueLabel').addClass('inactive');

        } else {

            //MODIFICATION DES CLASSES POUR DECLENCHER L'ANIMATION DU BOUTON COULISSANT
            $(this).removeClass('btnClose').addClass("btnOpen")

            // ATTRIBUTION AUTOMATIQUE D'UNE VALEUR AUX INPUT MASQUÉS EN FONCTION DE LA POSITION DES BOUTONS (OUVERT / FERMÉ)
            //$(this).parent().next("input").val('open');

            //MODIFICATION DES CLASSES POUR DECLENCHER L'ANIMATION DES RAILS
            $(nbRailOpen).removeClass('closeStatutRight').addClass('openStatutRight');
            $(nbRailClose).removeClass('openStatutLeft').addClass('closeStatutLeft');

            //MODIFICATION DES CLASSES POUR MODIFIER LA COULEUR DE L'ICONE SUR LE BOUTON
            $(icon).removeClass('defaultActive orangeIcon').addClass('blueIcon');

            //MODIFICATION DES CLASSES POUR CHANGER LA COULEUR DES LABELS
            $('#closeLabel' + miDay).removeClass('orangeLabel').addClass('inactive');
            $('#openLabel' + miDay).removeClass('defaultActive inactive').addClass('blueLabel');

        }

    })

    /* FIN ANIMATIONS BOUTONS GLISSANTS */

    /* THEME MYSTERE */

    $('#mystery').click(function () {

        $('.dayParam').addClass("cardBgSurprise");

        $('section').addClass("newThemeColor");

        $('main').addClass('themeMainColor');

        $('.bottomSection, .pageViewer').addClass('themeTransparrency');

        var menuNewTheme = $('.link').children();
        $(menuNewTheme).addClass('pinkBG');

        $(menuNewTheme).children().addClass('whiteColor');

        $('footer').addClass('footerBgSurprise');

        $('.linearGFooter, .viewerCont').addClass('resetLinear');

        $('header').addClass('headerBgSurprise');

    })

})