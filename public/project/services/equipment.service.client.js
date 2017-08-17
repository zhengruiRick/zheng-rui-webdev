(function () {
    angular
        .module("LoanerApp")
        .factory("equipmentService", equipmentService);

    function equipmentService($http) {

        var api = {
            "findAvailableEquipmentList": findAvailableEquipmentList,
            "findEquipmentById": findEquipmentById,
            "reserveItem": reserveItem,
            "findReservedEquipmentByUserId": findReservedEquipmentByUserId,
            "findLoanedEquipmentByUserId": findLoanedEquipmentByUserId,
            "findAllEquipmentList": findAllEquipmentList,
            "updateEquipment": updateEquipment,
            "deleteEquipment": deleteEquipment,
            "newEquipment":newEquipment

        };
        return api;

        function newEquipment(equipment) {
            console.log(equipment);
            var url = "/loanerApp/equipment/new";
            return $http.post(url, equipment);


        }

        function deleteEquipment(equipmentId) {

            var url = "/loanerApp/equipment/" + equipmentId;
            return $http.delete(url)
                .then(function (res) {
                    return res.data;
                })

        }

        function updateEquipment(equipmentId, equipment) {
            var url = "/loanerApp/equipment/" + equipmentId;
            $http.put(url, equipment)
                .then(function (res) {
                    return res.data;
                })


        }

        function findReservedEquipmentByUserId(userId) {
            var url = "/loanerApp/reserved/" + userId;
            return $http.get(url);

        }

        function findLoanedEquipmentByUserId(userId) {
            var url = "/loanerApp/loaned/" + userId;
            return $http.get(url);

        }


        function findAvailableEquipmentList() {
            return $http.get("/loanerApp/availableEquipmentList/");

        }

        function findEquipmentById(equipmentId) {
            return $http.get("/loanerApp/equipment/" + equipmentId);

        }

        function reserveItem(userId, equipmentId, equipment) {
            var url = "/loanerApp/reserve/" + equipmentId;
            equipment.reservedBy = userId;
            equipment.available = false;
            return $http.put(url, equipment)
                .then(function (res) {
                    return res.data;
                })

        }

        function findAllEquipmentList() {
            return $http.get("/loanerApp/allEquipmentList/");

        }


        //     function deleteUser(userId) {
        //
        //         var url = "/api/user/" +userId;
        //         return $http.delete(url)
        //             .then(function (res) {
        //                 return res.data;
        //             })
        //
        //     }
        //
        //     function updateUser(userId, user) {
        //
        //         var url = "/loanerApp/user/" + userId;
        //
        //         $http.put(url, user);
        //
        //
        //     }


        //
        //
        //     function findUserByCredentials(userEmail, password) {
        //
        //         var url = "/loanerApp/user?userEmail="+userEmail+"&password="+password;
        //
        //         return $http.get(url);
        //
        //
        //
        //     }
        //
        //     function createUser(user) {
        //
        //         var url = "/loanerApp/user";
        //
        //         return $http.post(url, user);
        //
        //
        //
        //
        //     }
        //
        //     function findUserByUserEmail(userEmail) {
        //         var url = "/loanerApp/user?userEmail="+userEmail;
        //
        //         return $http.get(url);
        //
        //
        //     }
        //
    }
})();