import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://gorest.co.in/public/v2/users";

class EmployeeService {

    gets(page, rowPerpage) {
        console.log("--- gets page: ",page , " rowPerpage: ",rowPerpage)
        var totalData = 200
        let map = []
        
        let curent = (page - 1) * rowPerpage
        let max = curent + rowPerpage
        console.log("curent: ",curent ," max: ",max)
        for (let i = 0; i < totalData; i++) {
            if (i >=curent && i< max) {
                map.push({
                    name: 'hieu' + i,
                    email: "adsdsa@gmail.com",
                    role: i

                })
            }

        }
        let totalPage = parseInt(totalData / rowPerpage, 10)
        
        return {
            totalPage: totalData,
            data: map
        }
        // return axios.get(EMPLOYEE_API_BASE_URL);
    }

    create(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    update(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    delete(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()