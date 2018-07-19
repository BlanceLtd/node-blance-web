window.onload = function() {
    GSR.init();
};

var GSR = {};

GSR.constants = {
	hamburgerNav: '.hamburger',
    mobileNav: '.nav-items',
    smoothScroll: '.smooth-scroll',
    timelineHolder: '.timeline-holder',
    timeline: '.timeline',
    timelineDate: '.timeline .date',
    timelineLeft: '.arrow.left',
    timelineRight: '.arrow.right',

    desktopDrop: '.document-holder',
    openDocs: '.open-docs',

    teamMember: '.member',
    teamCardClose: '.team-card, .team-card-back',
    teamCard: '.team-card',
    teamCardBack: '.team-card-back'



}

GSR.siteVars = {
    headerExpandedStatus: false,
    docExpandedStatus: false,
    headerCurrentHeight: null,
    currentTimelineSlide: 0,
    totalTimelineSlides: 0,
    widthTimelineSlides: 0,
    desktopDropHeight: null,
    timelineOffsetTop: null,
    stillCheckScroll: true,
}



// Initates the app
GSR.init = function init() {
	GSR.eventListeners();
    GSR.animationListeners();


    // get mobile nav height
    GSR.siteVars.headerCurrentHeight = $(GSR.constants.mobileNav).height();
    $(GSR.constants.mobileNav).css('height', 0);
    $(GSR.constants.mobileNav).show();

    //desktop dropdown height
    GSR.siteVars.desktopDropHeight = $(GSR.constants.desktopDrop).height();
    $(GSR.constants.desktopDrop).css('height', 0);
    $(GSR.constants.desktopDrop).show();

    //setup timeline slide count
    GSR.siteVars.totalTimelineSlides = $(GSR.constants.timelineDate).length - 1;
    GSR.siteVars.widthTimelineSlides = $(GSR.constants.timelineDate).width();

    GSR.updateTimeline();
}


GSR.eventListeners = function eventListeners() {
    $(GSR.constants.hamburgerNav).on('click', GSR.expandNav);

    $(GSR.constants.smoothScroll).on('click', GSR.scrollToElement);

    $( window ).resize(function(event) {
        if($(window).width() >= 840) {
            GSR.updateTimeline();
            if (GSR.siteVars.headerExpandedStatus) {
                $(GSR.constants.mobileNav).animate({height: "0px"});
                GSR.siteVars.headerExpandedStatus = false;
            }
        }
    });

    $(GSR.constants.timelineLeft).on('click', function(){
        if(GSR.siteVars.currentTimelineSlide > 0) {
            GSR.siteVars.currentTimelineSlide = GSR.siteVars.currentTimelineSlide - 1;
            GSR.updateTimeline();
        }
    })
    $(GSR.constants.timelineRight).on('click', function(){
        if(GSR.siteVars.currentTimelineSlide < GSR.siteVars.totalTimelineSlides) {
            GSR.siteVars.currentTimelineSlide = GSR.siteVars.currentTimelineSlide + 1;
            GSR.updateTimeline();
        }
    })

    $(GSR.constants.openDocs).on('click', GSR.expandDocs);

    $(GSR.constants.teamMember).on('click', GSR.openCard);
    $(GSR.constants.teamCardClose).on('click', GSR.shutCard);

    var scrollBuffer = 0;

    $('.container-block.evolution').waypoint(function() {
        GSR.siteVars.currentTimelineSlide = 0;
        GSR.updateTimeline();
        GSR.siteVars.stillCheckScroll = false;
    }, { offset: '50%' });

}


GSR.animationListeners = function animationListeners(){
}


GSR.updateTimeline = function updateTimeline() {
    var windowWidth = $(window).width();
    var $timelineholder = $(GSR.constants.timelineHolder);
    var $timeline = $(GSR.constants.timeline)

    var slideLeft = $timeline.css('left');
    slideLeft = (windowWidth / 2) - 333;
    slideLeft = slideLeft - (GSR.siteVars.currentTimelineSlide * GSR.siteVars.widthTimelineSlides)
    backgroundParalaxMultiplier = slideLeft * 1.5;
    // var bgPos =
    var backgroundY = $timelineholder.css('backgroundPosition').split(' ')[1];
    $timeline.css('left', slideLeft);
    $timelineholder.css('backgroundPosition', (backgroundParalaxMultiplier-1000) + 'px ' + backgroundY);


    switch(GSR.siteVars.currentTimelineSlide) {
        case 0:
            $(GSR.constants.timelineLeft).css('opacity', '0');
            $(GSR.constants.timelineRight).css('opacity', '1');

        break;
        case GSR.siteVars.totalTimelineSlides:
            $(GSR.constants.timelineLeft).css('opacity', '1');
            $(GSR.constants.timelineRight).css('opacity', '0');
        break;
        default:
            $(GSR.constants.timelineLeft).css('opacity', '1');
            $(GSR.constants.timelineRight).css('opacity', '1');
    }

}



GSR.scrollToElement = function scrollToElement(event) {
    event.preventDefault();
    var anchor = event.currentTarget.hash.substring(1);

    // keep anims nice

    setTimeout(function(){
        switch(anchor) {
        }
    },1000)
    $('html, body').animate({
        scrollTop: $('a[name="' + anchor + '"]').offset().top
    }, 1000);
}



GSR.expandNav = function expandNav(){
    if (GSR.siteVars.headerExpandedStatus) {
        $(GSR.constants.mobileNav).animate({height: "0px"});
        GSR.siteVars.headerExpandedStatus = false;

    } else {
        $(GSR.constants.mobileNav).show();
        $(GSR.constants.mobileNav).animate({height: GSR.siteVars.headerCurrentHeight + "px"});
        GSR.siteVars.headerExpandedStatus = true;
    }
}

GSR.expandDocs = function expandNav(){


    if (GSR.siteVars.docExpandedStatus) {
        $(GSR.constants.desktopDrop).animate({height: "0px"});
        GSR.siteVars.docExpandedStatus = false;

    } else {
        $(GSR.constants.desktopDrop).show();
        $(GSR.constants.desktopDrop).animate({height: GSR.siteVars.desktopDropHeight + "px"});
        GSR.siteVars.docExpandedStatus = true;
    }
}
