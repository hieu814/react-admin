import React, { useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { ROLES } from 'src/constants/constant'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormSelect
} from '@coreui/react'
import UserModal from "./components/Modal/index.js";
import UserApi from "../../api/usersApi";
import { successMessage, errorMessage } from '../components/MyMessage'
import { ShowConfirm } from '../components/ConfirmModal'

const columns = memoize(handleAction => [
  {
    name: 'id',
    selector: row => row._id,
    sortable: true
  },
  {
    name: 'Quyền',
    selector: row => row.role,
    sortable: true
  },
  {
    name: 'Tên',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true
  },
  {
    name: '',
    button: true,
    ignoreRowClick: true,
    cell: (row, index, column, id) => (
      <CButton
        color={"primary"}
        key={1}

        onClick={() => handleAction(false, row)}
      >
        {"Sửa"}
      </CButton>
    )
  },
  {
    name: '',
    button: true,
    allowOverflow: true,
    ignoreRowClick: true,
    cell: (row, index, column, id) => (
      <CButton
        color={"danger"}
        key={1}
        onClick={() => handleAction(true, row._id)}
      >
        Xóa
      </CButton>
    )
  }
]);
export default function User() {


  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(10)
  const [role, setRole] = useState(undefined)
  const [currentData, setCurrentData] = useState(null)

 
  const changeRowPerPage = async (perPage) => {
    console.log(perPage);
    setRowPerPage(perPage)
    fetchData();
  }

  const changePage = async (page) => {
    setCurrentPage(page)
    fetchData();
  }
  const changeRole = (r) => {
    let rol = r.target.value
    console.log("role: ", rol)
    if (rol === ROLES.NON)
      setRole(null)
    else
      setRole(rol)

  }
  const handleShowModal = (visible) => {
    if (!visible) {
      fetchData()
      setCurrentData(null)
    }
    setIsModalVisible(visible)
  }
  const fetchData = async (search) => {

    try {
      let respond = await UserApi.fetchUsers({ skip: currentPage, limit: rowPerPage, search: search, role: role });
      console.log("respond: ", respond)
      setData(respond.data)
      setTotalPage(respond.paging.total)
    } catch (error) {
      console.log(error)
    }

  }
  const handleSearch = (event) => {
    try {

      fetchData(event.target.search.value)

    } catch (error) {
      console.log("error: ", error)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log("handleSubmit: ")
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      event.preventDefault();
    } catch (error) {
      console.log("error: ", error)
    }
  }
  const handleEdit = (isDelete, event) => {
    if (isDelete) {
      try {
        ShowConfirm("Bạn có chắc không?",function (){
          UserApi.deleteUser(event);
          successMessage("Xóa thành công");
          fetchData();
        })
      } catch (error) {
        errorMessage("Xóa Thât bại");
      }

    } else {
      setCurrentData(event)
      handleShowModal(true)
    }

  }
  useMemo(() => {
    fetchData()
  }, []);
  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CButton
            color={"primary"}

            onClick={() => handleShowModal(true)}
          >
            {"Thêm"}
          </CButton>

        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow xs={{ cols: 1 }} md={{ cols: 3 }}>
                <CCol xs={12}>
                  <CForm className="d-flex" onSubmit={handleSearch}>
                    <CFormInput className="me-sm-2" placeholder="Search" size="sm" id="search" />
                    <CButton color="light" className="my-2 my-sm-0" type="submit">
                      Search
                    </CButton>
                  </CForm>
                </CCol>
                <CCol xs={12}>

                  <CFormSelect
                    aria-label="Default select example"
                    onChange={changeRole}
                    options={[
                      { label: 'Tất cả', value: ROLES.NON },
                      { label: 'Người dùng', value: ROLES.USER },
                      { label: 'Admin', value: ROLES.ADMIN },
                      { label: 'Nhân viên', value: ROLES.EDITTOR }
                    ]}
                  />
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>
              <DataTable
                title="Quản lý tài khoản"
                columns={columns((isDelete, event) => handleEdit(isDelete, event))}
                data={data}
                // customStyles={customStyles}
                onChangePage={(p) => changePage(p)}
                pagination={true}
                paginationTotalRows={totalPage}
                onChangeRowsPerPage={(r) => changeRowPerPage(r)}
                paginationServer={true}
                progressPending={isloading}

              />
            </CCardBody>
          </CCard>
        </CCol>


      </CRow >
      <UserModal
        isModalVisible={isModalVisible}
        setIsModalVisible={handleShowModal}
        onSubmit={handleSubmit}
        user={currentData}
      />
    </div>
  );

}


