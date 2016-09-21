describe("MyApp",function() {

	beforeEach(module('mainApp'));

	describe('Testing the get function',function(){

		var httpBackend,controller, scope, httpp;


		beforeEach(inject(function($rootScope, $controller, $httpBackend, $http) {

			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			httpp = $http;
			controller = $controller;
			httpBackend.when("GET", "/mytodos").respond(200, { data: 'value' });

		}));


		it('Should get all da data when loading the page',function() {
			var scope = {};
			httpBackend.expectGET('/mytodos');

			controller('app', {
				$scope: scope,
				$http: httpp
			});

			httpBackend.flush();

			expect(scope.todolist).not.toBeNull();

		});

	});	

});
