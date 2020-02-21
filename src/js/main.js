import '../sass/main.scss';

import '../assets/images/favicon.ico';
import '../assets/images/logo.png';
import '../assets/images/pulse-back.png';
import '../assets/images/circle-blue.png';
import '../assets/images/girl-face.png';

import '../assets/images/states-screen.png';
import '../assets/images/reward-screen.png';
import '../assets/images/camera-screen.png';
import '../assets/images/world-screen.png';

import '../assets/images/states-card-anger.png';
import '../assets/images/states-card-stress.png';
import '../assets/images/states-card-sleep.png';
import '../assets/images/states-card-anxiety.png';
import '../assets/images/states-card-energy.png';
import '../assets/images/states-cards.png';

import '../assets/images/icon-breath-taken.png';
import '../assets/images/icon-breath-state.png';
import '../assets/images/icon-breath-depth.png';
import '../assets/images/icon-breath-clock.png';

import '../assets/images/emotion.png';
import '../assets/images/dollar.png';
import '../assets/images/measure.png';
import '../assets/images/world.png';

import '../assets/images/facebook.png';
import '../assets/images/hero-back.png';
import '../assets/images/coins.png';
import '../assets/images/world-map.png';
import '../assets/images/transform-back.png';

import '../assets/images/chest-open.png';
import '../assets/images/chest-closed.png';
import '../assets/images/rewards-bg.jpg';
import '../assets/images/icon-user.png';
import '../assets/images/icon-plus.png';

import '../assets/pdfs/Conscious Onepager NEW.pdf';
import '../assets/pdfs/Conscious Pitchdeck.pdf';

import '../templates/pages/index.handlebars';
import '../templates/pages/privacy/index.handlebars';
import '../templates/pages/terms/index.handlebars';


const SECTION_SEL = ".section";

var timeout;
var currentIndex = 0;
var lastScroll = 0;
var previousDestTop;
var scrollingState = false;
var scrollingSpeed = 500;
var visibleSectionIndex = 0;
var sections = [];

document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, 0);

    sections = document.querySelectorAll(SECTION_SEL);

    var scrollHandler =  function (event) {

        var currentScroll = getScrollTop();
        if (scrollingState || currentScroll === lastScroll) {
            return false;
        }
        var scrollDirection = getScrollDirection(currentScroll);

        var screen_mid = currentScroll + (getWindowHeight() / 2.0);

        //is at top? when using `auto-height` for a small first section it won't be centered in the viewport
        if (!currentScroll) {
            visibleSectionIndex = 0;
        }

        //taking the section which is showing more content in the viewport
        else {
            for (var i = 0; i < sections.length; ++i) {
                var section = sections[i];
            
                // Pick the the last section which passes the middle line of the screen.
                if (section.offsetTop <= screen_mid)
                {
                    visibleSectionIndex = i;
                }
            }
        }

        const nextIndex = scrollDirection === "up" ? visibleSectionIndex - 1 : visibleSectionIndex + 1;

        moveNextSection(nextIndex, scrollHandler);
        
        return false;
    };

    // window.addEventListener('mousewheel', scrollHandler, false)
    // window.addEventListener('wheel', scrollHandler, false)
    // window.addEventListener('touchmove', scrollHandler, false)

    window.addEventListener('scroll', function (e) {   
        if (scrollingState) {
            // window.removeEventListener('DOMMouseScroll' ,scrollHandler, false);
            // window.removeEventListener('mousewheel', scrollHandler, false);
            // window.removeEventListener('wheel', scrollHandler, false);
            // window.removeEventListener('touchmove', scrollHandler, false);
        }
    });
    const anchorTop = document.querySelector("#anchor-top");
    anchorTop && anchorTop.addEventListener('click', function () {
        var nextIndex = currentIndex - 1;
        moveNextSection(nextIndex, scrollHandler);
    })

    const anchorBottom = document.querySelector("#anchor-bottom");
    anchorBottom && anchorBottom.addEventListener('click', function () {
        var nextIndex = currentIndex + 1;
        moveNextSection(nextIndex, scrollHandler);
    })
});

function moveNextSection(nextIndex, scrollHandler) {

    if (nextIndex >= 0 && nextIndex < sections.length) {
        currentIndex = nextIndex;

        const vtop = getDestinationPosition(sections[nextIndex]);

        scrollingState = true;
        window.scroll({ top: vtop, behavior: 'smooth' });
        
        clearTimeout(timeout);
        timeout = setTimeout(function(){
            // window.addEventListener('DOMMouseScroll' ,scrollHandler, false);
            // window.addEventListener('mousewheel', scrollHandler, false);
            // window.addEventListener('wheel', scrollHandler, false);
            // window.addEventListener('touchmove', scrollHandler, false);
            scrollingState = false;
        }, scrollingSpeed);

        lastScroll = vtop;
    }
}


//http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll

function getScrollTop () {
    var doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
}

/**
* Gets the window height. Crossbrowser.
*/
function getWindowHeight(){
    return 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
}

/**
* Gets the directon of the the scrolling fired by the scroll event.
*/
function getScrollDirection (currentScroll) {
    var direction = currentScroll > lastScroll ? 'down' : 'up';
    lastScroll = currentScroll;

    //needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination
    previousDestTop = currentScroll;

    return direction;
}

/**
* Returns the destination Y position based on the scrolling direction and
* the height of the section.
*/
function getDestinationPosition(element){
    const windowsHeight = getWindowHeight();
    var elementHeight = element.offsetHeight;
    var elementTop = element.offsetTop;

    //top of the desination will be at the top of the viewport
    var position = elementTop;
    var isScrollingDown =  elementTop > previousDestTop;
    var sectionBottom = position - windowsHeight + elementHeight;

    //is the destination element bigger than the viewport?
    if(elementHeight > windowsHeight){
        //scrolling up?
        if(!isScrollingDown){
            position = sectionBottom;
        }
    }

    //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
    else {
        //The bottom of the destination will be at the bottom of the viewport
        position = sectionBottom;
    }

    /*
    Keeping record of the last scrolled position to determine the scrolling direction.
    No conventional methods can be used as the scroll bar might not be present
    AND the section might not be active if it is auto-height and didnt reach the middle
    of the viewport.
    */
    previousDestTop = position;
    return position;
}

function createNumberAnimation(element, duration, unit) {
    $({ Counter: 0 }).animate({
        Counter: $(element).text()
    }, {
        duration: duration,
        easing: 'swing',
        step: function() {
            $(element).text(Math.ceil(this.Counter) + unit);
        }
    });
}

function createTextAnimation(element, duration, data) {
    let index = 0;
    setInterval(function() {
        $(element).fadeOut(duration, function() {
            $(element).text(data[index++ % data.length]);
        });
        $(element).fadeIn(duration);    
    }, duration)
}
 

$(document).ready(function () {
    createTextAnimation('.text-animation', 800, ['holding', 'exhaling', 'inhaling'])
    setInterval(function num_anim_start() {
        createNumberAnimation('.number-animation-1', 3000, '');
        createNumberAnimation('.number-animation-2', 3000, "%");
        createNumberAnimation('.number-animation-3', 1000, ''); 
        return num_anim_start;   
    }(), 4000)

    try {
        toastr.options.timeOut = 4000;
        toastr.options.fadeOut = 250;
        toastr.options.fadeIn = 250;
    } catch (e) {
        console.log("toastr is not used here")
    }

    $(".redirect-signup").on('click', function () {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        currentIndex = 0;
        lastScroll = 0;
        setTimeout(function () {
            $("#email-input").focus();
        }, 1000)
    });
    $(".email-input").on('change', function () {
        $('.email-input').val($(this).val())
    })

    $(".btn-signup").on('click', function () {
        $(".btn-signup").prop('disabled', true);
        fbq('track', 'Lead');
        
        let url = 'https://consciousos.us19.list-manage.com/subscribe/post?u=73252c714dc21042fba837c25&id=01c9c1e16a';
        url = url.replace('/post?', '/post-json?').concat('&c=?');

        const email = $(this).closest('.hero-controls').find('.email-input').val();

        const data = {
            EMAIL: email,
            FNAME: ''
        }
        console.log(data, "=data")

        $.ajax({
            url: url,
            type: 'post',
            data: data,
            dataType: 'jsonp',
            success: function (response) {                
                if (response.result == "success") {
                    toastr.success('Please check your inbox and verfy your email!', 'Registeration Success')
                } else {
                    toastr.error(response.msg, 'Registeration Failure!')
                }
                setTimeout(function () {
                    $(".btn-signup").prop('disabled', false);
                }, toastr.options.timeOut)

            }, error: function (response) {
                toastr.error('Fialed to register now, please try it again later!', 'Registeration Failure!')
                setTimeout(function () {
                    $(".btn-signup").prop('disabled', false);
                }, toastr.options.timeOut)

            }
        })
    });
});