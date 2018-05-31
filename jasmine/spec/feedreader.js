/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    it('feed URLs are defined', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });
    it('feed names are defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  describe('The menu', function() {
    let menuIcon = $('.menu-icon-link');
    it('menu element is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
    it('changes visibility when icon is clicked', function() {
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    it('should load at least one entry', function(done) {
      var numEntries = document.querySelectorAll(".feed .entry").length;
      expect(numEntries).toBeGreaterThan(0);
      done();
    })
  });

  describe('New Feed Selection', function() {
    let oldFeed,
      newFeed;
    // beforeEach(function(done) {
    //   loadFeed(0, function() {
    //     oldFeed = document.querySelector('.feed').innerHTML;
    //   });
    //   loadFeed(1, function() {
    //     newFeed = document.querySelector('.feed').innerHTML;
    //     done();
    //   });
    // });
    beforeEach(function(done) {
      loadFeed(0, function() {
        oldFeed = document.querySelector('.feed').innerHTML;
        loadFeed(1, function() {
          newFeed = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });

    it('the content changes after a new feed is loaded', function(done) {
      expect(newFeed !== oldFeed).toBe(true);
      done();
    });
  });
}());