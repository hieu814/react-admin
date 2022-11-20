// import { PlusCircleOutlined } from "@ant-design/icons";
import {  Space } from "antd";
import ExamModal from "src/views/Exam/components/ExamModal";
import ExamTable from "src/views/Exam/components/ExamTable";
import { fetchCategories, fetchExams } from "src/stores/exam/examSlice";
import { examValues } from "src/views/Exam/initialAndValidateValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import commonFuc from "src/utils/commonFuc";
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
MainPage.propTypes = {};

function MainPage(props) {
	const dispatch = useDispatch();
	const { examsPage, categories } = useSelector((state) => state.exam);
	const { data } = examsPage;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isAddMode, setIsAddMode] = useState(true);
	const [initialValue, setInitialValue] = useState(examValues.initial);

	const [query, setQuery] = useState({
		name: "",
		category: "",
		page: 0,
		rowPerPage: 10,
		size: 0,
	});

	const handleOnClick = () => {
		setIsModalVisible(true);
		setIsAddMode(true);
		setInitialValue(examValues.initial);
	};

	const handleSearchChange = (queryValue) => {
		const { category } = query;
		const name = queryValue
		setQuery({ page: 0, size: 10, name, category });
	};
	const handleCategoryChange = (id) => {
		let category = id
		if (!(id && id.length > 3)) {
			category = null
		}
		const { name } = query;
		setQuery({ page: 0, size: 10, name, category });
	};
	const handlePageChange = (page) => {
		setQuery({ ...query, page: page - 1 });
	};
	const changeRowPerPage = (rowPerPage) => {
		setQuery({ ...query, rowPerPage: rowPerPage });
	};
	useEffect(() => {

		dispatch(fetchExams({ skip: query.page, limit: query.rowPerPage, search: query.name, category: query.category }));
		dispatch(fetchCategories());
		console.log("category: ", categories)
	}, [query]);

	return (
		<CRow>
			<CCol xs={12}>
				<CButton
					color={"primary"}

					onClick={() => handleOnClick()}
				>
					{"Thêm"}
				</CButton>

			</CCol>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardHeader>
						<CRow xs={{ cols: 1 }} md={{ cols: 3 }}>
							<CCol xs={12}>
								<CForm className="d-flex">
									<CFormInput className="me-sm-2" placeholder="Search" size="sm" id="search"
										onChange={(e) => handleSearchChange(e.target.value)}
									/>
								</CForm>
							</CCol>
							<CCol xs={12}>

								<CFormSelect
									name="category"
									aria-label="Default select example"
									onChange={e => handleCategoryChange(e.target.value)}
									value={query.category}
									options={[{ label: "Tất cả", value: "-" }, ...categories?.map((value) => {
										const { _id, name } = value;
										return { label: name, value: _id }
									})]}
								/>
							</CCol>
						</CRow>

					</CCardHeader>
					<CCardBody>
						<Space direction="vertical" style={{ width: "100%" }}>
							<ExamTable
								exams={commonFuc.addSTTForList(data, query.page * query.size)}
								setInitialValue={setInitialValue}
								setIsModalVisible={setIsModalVisible}
								setIsAddMode={setIsAddMode}
								handlePageChange={handlePageChange}
								changeRowPerPage={changeRowPerPage}
								query={query}
							/>
						</Space>

						{isModalVisible && (
							<ExamModal
								isModalVisible={isModalVisible}
								setIsModalVisible={setIsModalVisible}
								isAddMode={isAddMode}
								initialValue={initialValue}
								query={query}
							/>
						)}
					</CCardBody>
				</CCard>
			</CCol>

		</CRow >

	);
}

export default MainPage;
