$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined(); // allFeeds is defined
            expect(allFeeds.length).not.toBe(0); //allFeeds Array is not empty
        });


        it('url are defined and not empty', function() {
            for (i = 0; i < allFeeds.length; i = i + 1) { // to go through allFeeds array to check for url
                expect(allFeeds[i].url).toBeDefined(); // url is defined
                expect(allFeeds[i].url).not.toBeNull(); // url is not null
                expect(allFeeds[i].url).not.toBe(""); // url is not empty string
            }
        });


        it('name are defined and not empty', function() {
            for (i = 0; i < allFeeds.length; i = i + 1) { // to go through allFeeds array to check for name
                expect(allFeeds[i].name).toBeDefined(); // name is defined
                expect(allFeeds[i].name).not.toBeNull(); // name is not null
                expect(allFeeds[i].name).not.toBe(""); // name is not empty string
            }
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true); // default menu-hidden is hidden hence should be true
        });

        it('shows and hides when clicked on', function() {

            $('.menu-icon-link').click(); // Intially its hidden so trigger click to open menu
            expect($('body').hasClass('menu-hidden')).toEqual(false); // if menu is open toEqual false

            $('.menu-icon-link').click(); //state of menu is open hence trigger click to close menu
            expect($('body').hasClass('menu-hidden')).toEqual(true); // if menu is closed toEqual true
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        // beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loads atleast one entry within the feed container', function() {
            expect($('.feed .entry').length).not.toEqual(0); // if there is an entry it will not equal 0
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        // variable feeds that will be used for comparison
        var firstFeed;
        var secondFeed;

        // beforeEach to wait for async calls to finish
        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = $('.feed').html();
                loadFeed(2, function() {
                    done();
                });
            });
        });

        // afterEach to reload first entry
        afterEach(function() {
            loadFeed(0);
        });

        it('displays feed content changes on menu select', function() {
            expect(firstFeed).toBeDefined(); //firstFeed is defined
            secondFeed = $('.feed').html(); // secondFeed is loaded
            expect(secondFeed).toBeDefined(); // secondFeed is defined
            expect(firstFeed).not.toEqual(secondFeed); // firstFeed not.toEqual secondFeed as new content should have loaded
        });

    });
}());
