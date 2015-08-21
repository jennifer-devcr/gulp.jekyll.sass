"use strict";

var Rimes = (function($){
    /**
     * Initialize the application
     */
    function init(){
        var $menu = $('#hdr-banner .menu');
        addHdrActions();
        displayUserInfo();
        //Fixed Header
        $(window).scroll(function(){
            var menuFadeinClass = 'fadein-background-hdr',
                menuFadeoutClass = 'fadeout-background-hdr',
                fixedMenuClass = 'fixed',
                scrollTop = $(window).scrollTop(),
                $header = $('#hdr-banner');

            if(scrollTop > 0){
                $header.removeClass(menuFadeoutClass).addClass(menuFadeinClass);
                $menu.addClass(fixedMenuClass);
            }else if(scrollTop == 0){
                $header.removeClass(menuFadeinClass).addClass(menuFadeoutClass);
                $menu.removeClass(fixedMenuClass);
            }
        });
    }

    /**
     * Adds actions to header icons
     */
    function addHdrActions(){
        var $proInfBox = $('#hdr-banner .profile-info-box'),
            $searchBox = $('#hdr-banner .search-box'),
            $ddBox = $('#hdr-banner .search-box .dropdown-box'),
            $menu = $('#hdr-banner .menu'),
            $menuIcon = $('#hdr-banner .menu-icon'),
            $searchDomain = $('#search-domain .domain'),
            closeAllHdrActionsBoxes = function (){
                $proInfBox.fadeOut();
                $searchBox.fadeOut();
                $ddBox.fadeOut();
                $menu.fadeOut();
                $menuIcon.removeClass('active');
            };

        //Displays profile information
        $('#hdr-banner .user-icon').click(function(){
            closeAllHdrActionsBoxes();
            if(!$proInfBox.is(":visible")) $proInfBox.fadeIn();
        });

        //Displays search section
        $('#hdr-banner #a-search, #hdr-banner .search-box #search-close').click(function(){
            closeAllHdrActionsBoxes();

            if(!$searchBox.is(":visible")){
                $('#hdr-banner .search-box input').val('');
                $searchBox.fadeIn();
            }
        });

        //Displays search options box
        $('#hdr-banner .sub-menu').click(function(){
            $ddBox.fadeOut();
            if(!$ddBox.is(":visible")) $ddBox.fadeIn();
        });

        //Displays main menu
        $menuIcon.click(function(){
            closeAllHdrActionsBoxes();
            if(!$menu.is(":visible")){
                $menuIcon.addClass('active');
                $menu.fadeIn();
            }
        });

        //Search Domain selection
        $searchDomain.click(function(){
            $searchDomain.removeClass('active');
            $(this).addClass('active');
        });
    }

    function displayUserInfo(){
        var path = window.location.pathname,
            loginPath = '/';

        if(localStorage.userid && localStorage.userid.length > 0){
            $('.profile-info-box .userid').text(localStorage.userid);
        }else if(path !== loginPath){
            logout();
        }
    }

    /**
     * Alias Feature
     */
    function displayAliasForm(){
        var $aliasName = $('#hdr-banner .profile-info-box #alias-name'),
            $input = $('#hdr-banner .profile-info-box #alias-input'),
            $changeLink = $('#hdr-banner .profile-info-box #alias-change'),
            $btns = $('#hdr-banner .profile-info-box #alias-btns');

        if($aliasName.is(":visible")){
            $changeLink.hide();
            $aliasName.hide();
            $input.val('');
            $input.show();
            $btns.show();
        }else{
            $input.hide();
            $btns.hide();
            $changeLink.show();
            $aliasName.show();
        }
    }

    function doAlias(){
        var $aliasName = $('#hdr-banner .profile-info-box #alias-name'),
            $input = $('#hdr-banner .profile-info-box #alias-input'),
            $changeLink = $('#hdr-banner .profile-info-box #alias-change'),
            $btns = $('#hdr-banner .profile-info-box #alias-btns'),
            $profileIcon = $('#hdr-banner .user-icon');
        $input.hide();
        $btns.hide();
        $changeLink.show();
        $aliasName.show();

        if($input.val().length > 0){
            $aliasName.text($input.val());
            $profileIcon.removeClass('profile-blue').addClass('profile-orange');
        }else{
            $aliasName.text('Alias');
            $profileIcon.removeClass('profile-orange').addClass('profile-blue');
        }
    }

    function changeAlias(type, e){
        if(type == 'click'){
            doAlias();
        }else if(type == 'keydown'){
            var evt = window.event ? window.event : e,
                unicode = evt.keyCode ? evt.keyCode : evt.charCode;

            if(unicode == 13)
                doAlias();
        }
    }

    /**
     * Logout
     */
    function logout(){
        localStorage.userid = '';
        window.location.href = '/';
    }

    return {
        initApp: init,
        actions: {
            displayAliasForm: displayAliasForm,
            changeAlias: changeAlias,
            logout: logout
        }
    };
})(jQuery);

(function($){
    $(function(){
        Rimes.initApp();
    }); // end of document ready
})(jQuery); // end of jQuery name space
