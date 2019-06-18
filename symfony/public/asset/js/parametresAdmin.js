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

    //console.log(nbDaysInCurrentMonth);
    //console.log(nbDaysInNextMonth);

    /* CRÉATION DES CARTES DE DATES DANS LES SLIDER */

    var dateCard = "";
    var currentMonthSelector = $("#currentMonth"); // SLIDE DU MOIS ACTUEL
    var nextMonthSelector = $('#nextMonth'); // SLIDE DU MOIS SUIVANT

    var createDateCard = function (card, id, date, mois, idDate) {

        dateCard = `
        <div class="dayParam" id="`+ idDate + `">

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
                <button class="btn btnmidi buttonParam btnOpen" id="buttonMidi`+ id + `" data-miDay="Midi` + mois + id + `"><i class="fas fa-bars defaultActive iconBtn" id="iconeMidi` + id + `"></i></button>
                <div class="railOpen" id="railOpenMidi`+ id + `"></div>
                <input type="text" class="midiInput hidden" id="midi-` + idDate + `" data-creneau="midi" data-date-Input="` + idDate + `">
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
                <button class="btn btnsoir buttonParam btnOpen" id="buttonSoir`+ id + `"data-miDay="Soir` + mois + id + `"><i class="fas fa-bars defaultActive iconBtn" id="iconeSoir` + id + `"></i></button>               
                <div class="railOpen" id="railOpenSoir`+ id + `"></div>
                <input type="text" class="soirInput hidden" id="soir-` + idDate + `" data-creneau="soir" data-date-Input="` + idDate + `">
            </div>

        </div>
    </div>`;

        $(card).append(dateCard);

    }

    //CREATION DES CARTES DU MOIS ACTUEL
    for (i = 1; i < nbDaysInCurrentMonth + 1; i++) {

        createDateCard(currentMonthSelector, i, frenchDate(new Date(y, m, i)), monthOnly(new Date(y, m, i)), formatDate(new Date(y, m, i)));

    }

    //CREATION DES CARTES DU MOIS SUIVANT
    for (i = 1; i < nbDaysInNextMonth + 1; i++) {

        createDateCard(nextMonthSelector, i, frenchDate(new Date(y, m + 1, i)), monthOnly(new Date(y, m + 1, i)), formatDate(new Date(y, m + 1, i)));

    }

    /* FIN CRÉATION DES CARTES DE DATES */

    /* CRÉATION DU TITRE DU SLIDER (NOM DU MOIS) */

    var whatMonth = new Date()
    var tab_month = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
    var next_month = new Array("Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Janvier");
    //console.log(tab_month[whatMonth.getMonth()]);
    //console.log(next_month[whatMonth.getMonth()]);

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
        //console.log(miDay);

        var nbRailOpen = $(this).next('.railOpen');

        var nbRailClose = $(this).prev('.railClose');

        var icon = $(this).children('.iconBtn');

        var nbLabelClose = $(this).closest(".generalParam");/*.children('.closeLabel');*/

        //console.log(nbLabelClose);

        var nbLabelOpen = $(this).closest(".generalParam");/*.children('.openLabel');*/

        //console.log(nbLabelOpen);

        if ($(this).hasClass('btnOpen')) {

            //MODIFICATION DES CLASSES POUR DECLENCHER L'ANIMATION DU BOUTON COULISSANT
            $(this).removeClass('btnOpen').addClass("btnClose");

            // ATTRIBUTION AUTOMATIQUE D'UNE VALEUR AUX INPUT MASQUÉS EN FONCTION DE LA POSITION DES BOUTONS (OUVERT / FERMÉ)            
            var inputOpenID = $(this).parent().find("input").attr('id');
            $('#' + inputOpenID).val("close");

            //console.log('inputOpenID', inputOpenID);

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
            var inputCloseID = $(this).parent().find("input").attr('id');
            $('#' + inputCloseID).val("open");

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

    // Mise a jour automatique de la position des boutons en fonction du contenu de la BDD

    var listDateCont = $(".dayParam");

    var listDateBDD = $('#BDDRECAP').children();

    for (i = 0; i < listDateCont.length; i++) {
        for (a = 0; a < listDateBDD.length; a++) {

            if ($(listDateCont[i]).attr('id') == $(listDateBDD[a]).attr("id")) {

                var statutmidi = $(listDateBDD[a]).attr("data-midi");

                var btnmidi = $(listDateCont[i]).find(".btnmidi");

                // En fonction du contenu de la base, on simule le clic sur le bouton pour le passer dans la position correspondante
                if ($(btnmidi).hasClass("btnOpen")) {
                    if (statutmidi == "close") {
                        $(btnmidi).addClass('closeBDD').trigger('click');
                    } else {
                    }
                } else if ($(btnmidi).hasClass("btnClose")) {
                    if (statutmidi == "open") {
                        $(btnmidi).addClass("openBDD").trigger('click');
                    } else {
                    }

                } else {

                }

            }

        }
    }

    for (i = 0; i < listDateCont.length; i++) {
        for (a = 0; a < listDateBDD.length; a++) {

            if ($(listDateCont[i]).attr('id') == $(listDateBDD[a]).attr("id")) {

                var statutsoir = $(listDateBDD[a]).attr("data-soir");

                var btnsoir = $(listDateCont[i]).find(".btnsoir");

                // En fonction du contenu de la base, on simule le clic sur le bouton pour le passer dans la position correspondante

                if ($(btnsoir).hasClass("btnOpen")) {
                    if (statutsoir == "close") {
                        $(btnsoir).addClass('closeBDD').trigger('click');
                    } else {
                    }
                } else if ($(btnsoir).hasClass('btnClose')) {
                    if (statutsoir == "open") {
                        $(btnsoir).addClass('openBDD').trigger('click');
                    }
                }
            } else {

            }

        }
    }

    // REQUETE AJAX UPDATE

    $(".buttonParam").click(function () {

        var inputID = $(this).parent().find("input").attr('data-date-Input');
        var statutCreneau = $(this).parent().find("input").val();
        var dataCreneau = $(this).parent().find("input").attr('data-creneau');
        /*   console.log("statutCreneau: ", statutCreneau);
           console.log("dataCreneau: ", dataCreneau);
           console.log("inputID: ", inputID);*/

        $.ajax({
            url: routeAjax,
            type: "POST",
            data: `monInput=` + inputID + `&creneau=` + dataCreneau + `&monstatut=` + statutCreneau,
            dataType: "HTML",
            success: function (code_html, statut) {

            },

            error: function (resultat, statut, erreur) {

            },

            complete: function (resultat, statut) {

            }

        });

    })

})