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
import VocabularyModal from "./components/Modal/index.js";
import VocabularyApi from "src/api/vocabularyApi";
import VocabularyCategoryApi from "src/api/vocabularyCategoryApi";
import { successMessage, errorMessage } from '../components/MyMessage'
import MyAction from 'src/views/components/MyAction'


const columns = memoize(handleAction => [
  {
    name: 'Từ',
    selector: row => row.word,
    sortable: true
  },
  {
    name: 'Ảnh',
    selector: row => row.description,
    cell: (row, index, column, id) => (
      <Image src={row.image} width={100} height={100} />
    )

  },
  {
    name: 'Phát âm',
    selector: row => row.pronounce,
    sortable: true
  },
  {
    name: 'Loại từ',
    selector: row => row.type,
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
    if (_id && _id.length > 3) {
      setCategoryID(_id)
    } else {
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
        let _category = await VocabularyCategoryApi.fetchData({ skip: 0, limit: 100 });
        setCategories(_category.data)
      }

      let respond = await VocabularyApi.fetchData({ skip: currentPage, limit: rowPerPage, search: searchString, category: categoryID });
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
        VocabularyApi.delete(event._id);
        successMessage("Xóa thành công");
      } catch (error) {
        errorMessage("Xóa Thât bại");
      }
      fetchData()

    } else {
      console.log("-----------vocabulary ",event)
      setCurrentData(event)
      handleShowModal(true)
    }

  }
  useEffect(() => {

    fetchData()
  }, [categoryID, searchString, rowPerPage, totalPage, currentPage]);
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
                title="Quản lý từ vựng"
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
      <VocabularyModal
        categories={categories}
        isModalVisible={isModalVisible}
        setIsModalVisible={handleShowModal}
        onSubmit={handleSubmit}
        vocabulary={currentData}
      />
    </div>
  );

}


