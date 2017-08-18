(function () {
    angular
        .module("LoanerApp")
        .factory("taskService", taskService);

    function taskService($http) {

        var api = {
            "createTask": createTask,
            "deleteTask": deleteTask,
            "findAllTasks": findAllTasks

        };
        return api;



        function deleteTask(taskId) {

            var url = "/loanerApp/task/" +taskId;
            return $http.delete(url)
                .then(function (res) {
                    return res.data;
                })

        }



        function createTask(task) {

            var url = "/loanerApp/task";

            return $http.post(url, task);

        }

        function findAllTasks() {
            return $http.get("/loanerApp/tasks/");

        }


    }
})();