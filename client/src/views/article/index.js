import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Upload, Image } from "antd";
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
import ArticleModal from "./components/Modal/index.js";
import ArticleApi from "src/api/articleApi";
import ArticleCategoryApi from "src/api/ArticleCategoryApi";
import { successMessage, errorMessage } from '../components/MyMessage'
import MyAction from 'src/views/components/MyAction'


const columns = memoize(handleAction => [
  {
    name: 'id',
    selector: row => row._id,
    sortable: true
  },
  {
    name: 'Ảnh',
    selector: row => row.description,
    cell: (row, index, column, id) => (
      <Image src={"https://toeic-bucket-0.s3.ap-southeast-1.amazonaws.com/images/undefined_Sutton-1.jpg"} width={100} height={100} />
    )

  },
  {
    name: 'Tên',
    selector: row => row.name,
    sortable: true
  },

  {
    name: '',
    button: true,
    allowOverflow: true,
    ignoreRowClick: true,
    cell: (row, index, column, id) => (
      <MyAction
        handleAction={(isDelete) => handleAction(isDelete, row)}
      >
      </MyAction>
    )
  }
]);
export default function View() {


  const [isModalVisible, setIsModalVisible] = useState(false)
  const [data, setData] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [rowPerPage, setRowPerPage] = useState(10)
  const [currentData, setCurrentData] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryID, setCategoryID] = useState(null)
  const [searchString, setSearchString] = useState(null)

  const changeRowPerPage = async (perPage) => {
    console.log(perPage);
    setRowPerPage(perPage)
  }
  const changeCategoryID = async (id) => {
    let _id = id.target.value
    if(_id && _id.length >3){
      setCategoryID(_id)
    }else{
      setCategoryID(null)
    }
  }
  const changePage = async (page) => {
    setCurrentPage(page)
  }
  const handleShowModal = (visible) => {
    if (!visible) {
      fetchData()
      setCurrentData(null)
    }
    setIsModalVisible(visible)
  }
  const fetchData = async () => {

    try {
      if (categories.length === 0) {
        let _category = await ArticleCategoryApi.fetchData({ skip: 0, limit: 100 });
        setCategories(_category.data)
      }

      let respond = await ArticleApi.fetchData({ skip: currentPage, limit: rowPerPage, search: searchString, category: categoryID });
      console.log("respond: ", respond)
      setData(respond.data)
      setTotalPage(respond.paging.total)
    } catch (error) {
      console.log(error)
    }

  }
  const handleSearch = (event) => {
    try {
      setSearchString(event.target.search.value)
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
        ArticleApi.delete(event._id);
        successMessage("Xóa thành công");
      } catch (error) {
        errorMessage("Xóa Thât bại");
      }
      fetchData()

    } else {
      setCurrentData(event)
      handleShowModal(true)
    }

  }
  useEffect(() => {
    fetchData()
}, [categoryID,searchString,rowPerPage,totalPage,currentPage]);
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
                    name="category"
                    aria-label="Default select example"
                    onChange={changeCategoryID}
                    value={categoryID}
                    options={[{ label: "Tất cả", value: "-" }, ...categories?.map((value) => {
                      const { _id, name } = value;
                      return { label: name, value: _id }
                    })]}
                  />
                </CCol>
              </CRow>

            </CCardHeader>
            <CCardBody>
              <DataTable
                title="Quản lý bài học"
                columns={columns((isDelete, event) => handleEdit(isDelete, event))}
                data={data}
                categories={categories}
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
      <ArticleModal
        categories={categories}
        isModalVisible={isModalVisible}
        setIsModalVisible={handleShowModal}
        onSubmit={handleSubmit}
        article={currentData}
      />
    </div>
  );

}


