import React, { useState } from 'react'

import DataTable from 'react-data-table-component';
import userService from '../../services/UserServices'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react'
const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        email: 'email',
        selector: row => row.email,
    },
    {
        role: 'role',
        selector: row => row.role,
    }
];
const UsersTables = (props) => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(10)
    const [perPage, setPerPage] = useState(10)
    const [isloading, setIsloading] = useState(10)


    const changeRowPerPage = (perPage) => {
        console.log(perPage);
        setPerPage(perPage);
        fetchProjectsPaginated();
    }

    const changePage = (page) => {
        let set = page
        console.log("changePage ", set);
        setCurrentPage(set);
        setCurrentPage(set);
        setCurrentPage(set);
        setCurrentPage(set);
        console.log("changePage after ", currentPage);
        fetchProjectsPaginated();
    }
    const fetchProjectsPaginated = () => {
        // setTableLoading(true);
        // const apiEndPoint = `${ApiUrl}/projects/datatables?page=${page}&rows=${rows}`;
        // let token = xxxxxxxxx;
        // const settings = {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        // };

        // fetch(apiEndPoint, settings)
        //     .then(response => response.json())
        //     .then(json => {
        //         if(json.success) {
        //             dispatch({type: 'projects', payload: json.projects});
        //             setTotal(json.total);
        //             setTableLoading(false);

        //         }
        //     });
        console.log("fetchProjectsPaginated currentPage ", currentPage);
        var obj = userService.gets(currentPage, perPage)
        let total = obj.totalPage
        console.log("fetchProjectsPaginated total : ", total)
        setIsloading(true)
        setTotalPage(total)
        console.log("fetchProjectsPaginated setTotalPage : ", totalPage)
        setData([])
        setData(obj.data)
        setIsloading(false)
    }
    return (
        <CRow>
            <CCol xs={12}>
                <CButton
                    color={"primary"}
                    key={1}
                    onClick={fetchProjectsPaginated}
                >
                    {"Test"}
                </CButton>
            </CCol>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>React Table</strong> <small>Hoverable rows</small>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={data}
                            // paginationPerPage={currentPage}
                            onChangePage={changePage}
                            pagination={true}
                            paginationTotalRows={totalPage}
                            onChangeRowsPerPage={changeRowPerPage}
                            paginationServer={true}
                            progressPending={isloading}
                        />
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    )
}

export default UsersTables
