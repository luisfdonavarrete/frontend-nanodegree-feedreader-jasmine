/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('ensure that all feeds have a url attribute', function () {
            var urlFlag = true;
            allFeeds.forEach(function (params) {
                if (params.url === undefined || params.url.length === 0) {
                    urlFlag = false;
                }
            });
            expect(urlFlag).toBe(true);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('ensure that all feeds have a url attribute', function () {
            var nameFlag = true;
            allFeeds.forEach(function (params) {
                if (params.name === undefined || params.name.length === 0) {
                    nameFlag = false;
                }
            });
            expect(nameFlag).toBe(true);
        });
    });


    /* Test suite taht test the menu funtionality */
    describe('The menu', function () {

        var $menu = $('.menu-icon-link');

        beforeEach(function () {
            spyOnEvent('.menu-icon-link', 'click');
        });
        
        /* Test that ensures the menu element is
        * hidden by default. 
        */
        it('The menu should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('Ensures the menu changes visibility when the menu icon is clicked', function () {
            $menu.click();
            expect('click').toHaveBeenTriggeredOn('.menu-icon-link');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite that tests the initial entries */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            /* Call the loadFeed function with the done function as a callback */
            loadFeed(0, done);
        });
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('Test that loadFeed function loads at least a single entry', function () {
            /* Check if the is at least one element with the .entry class */
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });
    
    /* Test suite that tests the new feed selection*/
    describe('New Feed Selection', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });
        
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('Ensure that the content is actually changing when a new feed is loaded', function (done) {
            /**Helper function that parses the entries from the html  
            * @return Array - return an array with all the entries titles
            */
            function parseFeeds() {
                var feeds = [];
                $('.feed').find('.entry').each(function (id, value) {
                    feeds.push($(value).first('h2').text().trim());
                });
                return feeds;
            }

            var initialFeeds = parseFeeds();

            loadFeed(1, function () {
                var newFeeds = parseFeeds();
                /* Compare the initial feeed with the new ones after loadFeed has finished */ 
                expect(newFeeds).not.toEqual(initialFeeds);
            });

        });
    });
} ());
