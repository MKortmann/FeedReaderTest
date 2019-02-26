/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* The tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite: that just contains
	 * a related set of tests.
	 */
	/**Is used to identify a suit, which is a group of related specs!*/
	describe("RSS Feeds", () => {
		/* This test make sure that allFeeds variable has been defined
		 * and that it is not empty.
		 */
		it("RSS Feeds should be defined", () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This test loops through each feed in allFeeds objects and ensures
		 * it has a URL defined and that the URL is not empty.
		 */
		it("the URLs should be defined and not empty", () => {
			for (let i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
		});
		/* This test loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it("the names should be defined and not empty", () => {

			for (let i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}

		});
	});

	/* Test suite: "The menu" */
	describe("The menu", () => {

		/* This test ensures that the menu element is
		 * hidden by default.
		 */

		it("is the menu element hidden by default?", () => {
			let bodyClass = document.querySelector("body").classList;
			expect(bodyClass[0]).toBeDefined();
			expect(bodyClass).toContain("menu-hidden");
		});

		/* This test ensures that the menu changes
		 * visibility when the menu icon is clicked. This test
		 * have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it("the menu should change visibility", () => {

			/*Getting the hamburger menu from DOM*/
			let hamburger = document.querySelector(".icon-list");
			/*Get the list of the body class*/
			let bodyClass = document.querySelector("body").classList;
			/*At begging the menu should be hidden, in this case it should
			have the class: menu-hidden that hides the menu*/
			expect(bodyClass[0]).toBeDefined();
			expect(bodyClass).toContain("menu-hidden");

			/**1st Click*/
			/*If you click at the menu hamburger, it should remove the class
			menu-hidden from the body. So, the menu will appear*/
			hamburger.click();
			bodyClass = document.querySelector("body").classList;
			expect(bodyClass).not.toContain("menu-hidden");

			/**2nd Click*/
			/*If you click again, the sidenav should disappear*/
			hamburger.click();
			bodyClass = document.querySelector("body").classList;
			expect(bodyClass[0]).toBeDefined();
			expect(bodyClass).toContain("menu-hidden");
		});
	});
	/* Test suite: "Initial Entries" */
	describe("Initial Entries", function() {

		/* This test ensures that when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it("Loadfeed finished so it should have at least one single", function(done) {
			const feedContainer = document.querySelector(".feed");
			expect(feedContainer.length).not.toBe(0);
			done();
			/*done() is important because it signal to the framework that this function
			rely upon that asynchronous execution.*/
		});
	});
	/* Test suite: "New Feed Selection"*/
	describe("New Feed Selection", function() {
		/* This test ensures that when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it("Loadfeed finished, content actually changes", function(done) {
			this.feedContainerZero = document.querySelector(".feed").children[0];
			loadFeed(1, done);
			/*done(); /*Important: signal to the framework that this function rely
			 upon that asynchronous execution.*/
		});

		afterEach(function() {
			this.feedContainerFirst = document.querySelector(".feed").children[0];
			expect(this.feedContainerZero).not.toEqual(this.feedContainerFirst);
		});
	});
}());
