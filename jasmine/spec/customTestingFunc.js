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


			it('should get all da data when the page is loading',function() {
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});

				httpBackend.flush();

				expect(scope.todolist).toEqual({todos});
				// console.log(scope.todolist)

			});


			it('should post all mytodos when \'Enter Your Tasks\' button is clicked',function(){
				
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
				// console.log(scope.todolist)

			});


			it('should delete data from mytodos when \'Delete\' button is clicked',function(){

				httpBackend.when("DELETE", "/mytodos/57e50752b30f6512ed453e7d/false").respond(200,{todos});
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});

				scope.finishedTasks('57e50752b30f6512ed453e7d','false');
				httpBackend.flush();
				expect(scope.todolist).toEqual({todos});
				// console.log(scope.todolist)

			});


			it('should change the status of the data when \'Done\' button is clicked',function(){

				httpBackend.when("PUT", "/mytodos/57e4c96b87425a0a216de7af").respond(200,{todos});
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});

				scope.addToCompleted('57e4c96b87425a0a216de7af');
				httpBackend.flush();
				expect(scope.todolist).toEqual({todos});
				// console.log(scope.todolist)

			});


			it('should get todo tasks data when \'Todo tasks\ button is clicked',function(){

				httpBackend.when("GET", "/mytodos").respond(200,{todos});
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});

				scope.getTodos();
				httpBackend.flush();
				expect(scope.todolist).toEqual({todos});
				// console.log(scope.todolist)
			});


			it('should get completed tasks data when \'Completed tasks\ button is clicked',function(){

				httpBackend.when("GET", "/mycompletedtodos").respond(200,{todos});
				
				controller('app', {
					$scope: scope,
					$http: httpp
				});

				scope.completedTasks();
				httpBackend.flush();
				expect(scope.todolist).toEqual({todos});
				// console.log(scope.todolist)
			});

		});	

	});