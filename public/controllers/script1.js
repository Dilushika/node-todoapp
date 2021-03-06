
var app = angular.module("mainApp", []);



app.controller("app", function($scope,$http) {

    $scope.count = 1;

    $http.get('/mytodos')
    .success(function(data){
        $scope.todolist = data;
        
    })
    .error(function(data){
        console.log('Error: '+data);
    });


    
    $scope.addTasks = function(){
        $http.post('/mytodos',{ taskMessage: $scope.task })
        .success(function (data){
            $scope.task = null;
            $scope.todolist = data;
        })
        
        .error(function(err){
            console.log(err);
        });

    };

    $scope.completedTasks = function() {
        $http.get('/mycompletedtodos')
        .success(function(data){
            $scope.todolist = data;
            
        })
        .error(function(data){
            console.log('Error: '+data);
        }); 
    };

    $scope.getTodos = function() {
        $http.get('/mytodos')
        .success(function(data){
            $scope.todolist = data;
            
        })
        .error(function(data){
            console.log('Error: '+data);
        });
    };


    $scope.finishedTasks = function(id,status){
        $http.delete('/mytodos/' + id + '/' + status)
        .success(function(data){
            $scope.todolist = data;
            
        })
        .error(function(data){
            console.log('Error: ' + data);
        });

    };


    $scope.addToCompleted = function(id) {
        $http.put('/mytodos/'+ id)
        .success(function(data){
            $scope.todolist = data;
                        
        })
        .error(function(data){
            console.log('Error: ' +data);
        });
    };

});



