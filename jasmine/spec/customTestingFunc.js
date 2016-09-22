	describe("MyApp",function() {

		beforeEach(module('mainApp'));

		describe('Testing the angular controllers',function(){

			var httpBackend,controller, scope, httpp, value1, value2, value3, todos;

			todos = [{ data:'value1'}, {data:'value2' }];

			beforeEach(inject(function($rootScope, $controller, $httpBackend, $http) {

				scope = $rootScope.$new();
				httpBackend = $httpBackend;
				httpp = $http;
				
				
				httpBackend.when("GET", "/mytodos").respond(200,{todos});
				controller = $controller;

			}));


			it('Should get all da data when loading the page',function() {
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});

				httpBackend.flush();

				expect(scope.todolist).toEqual({todos});

			});


			it('Should post all mytodos',function(){
				
				httpBackend.when("POST", "/mytodos").respond(200,{todos});
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});
				scope.task = 'hello';
							
				scope.addTasks();

				httpBackend.flush();


				expect(scope.todolist).toEqual({todos});

				expect(scope.task).toEqual(null);

			});

		});	
	});