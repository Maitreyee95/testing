/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		var names=[],urls=[];

		// names is an array of names of all feeds available
		// url is an array of urls of all feeds available
		beforeEach(function(){
			allFeeds.forEach(function(feed) {
				names.push(feed.name);
				urls.push(feed.url);
			});
		});

		it('each feed has URL', function () {
			urls.forEach(function(url){
				expect(url).toBeDefined();
				expect(url.length).toBeGreaterThan(0);
			});
		});

		/* a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */

		 it('each feed has name', function () {
			names.forEach(function(name){
				expect(name).toBeDefined();
				expect(name.length).toBeGreaterThan(0);
			});
		 });
	});


	/* a new test suite named "The menu" */
	describe("The menu", function(){
		/* a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */

		var body= $('body');
		var menuIcon=$('.menu-icon-link');

		//by default,body should have the class 'menu-hidden'
		it('hides by default', function(){
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		 /* a test that ensures the menu changes
		  * visibility when the menu icon is clicked. This test
		  * should have two expectations: does the menu display when
		  * clicked and does it hide when clicked again.
		  */

		//on clicking the menu icon once, body should not have the class 'menu-hidden'
		//on clicking the menu icon again, body should have the class 'menu-hidden'
		it("shows and hides on clicking menu icon", function(){
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(false);
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* a new test suite named "Initial Entries" */
	describe('Initial Entries', function(){
		/* a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */

		var container=$('.feed');
		beforeEach(function(done){
			loadFeed(0,done);
		});

		//the jQuery set of matched elements with class 'entry' should have more than zero element,
		//i.e the set exists when loadfeed function runs
		it('has atleast one entry', function(done){
			expect(container.find('.entry').length).not.toBe(0);
			done();
		});
	});

	/* a new test suite named "New Feed Selection" */
	describe("New Feed Selection", function(){
		/* a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */

		var content1,content2;
		var container=$('.feed');

		beforeEach(function(done){
			loadFeed(0,function(){
				content1=container.html(); //content1 is html of the previously load content
				loadFeed(1,function(){
					content2=container.html(); //content 2 is html of the newly load content
					done();
				});
			});
		});

		// content1 should not match content2
		it('changes content', function(done){
			expect(content1).not.toBe(content2);
			done();
		});
	});

}());
