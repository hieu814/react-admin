
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import ArticleApi from "src/api/articleApi";
import { successMessage, errorMessage } from 'src/views/components/MyMessage';
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MyImageUpload from "src/views/components/MyImageUpload";
import MyEditor from "src/views/components/MyEditor";
import {
    CCol,
    CRow,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect

} from '@coreui/react'
export const schema = {
    initial: {
        name: "",
        thumbail: "",
        content: "",
        category: ""
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống")

    }),

};

function MyModal(props) {
    const dispatch = useDispatch();
    const { isModalVisible, setIsModalVisible } = props;
    const [errorMsg, setErrorMsg] = useState("");
    const [categories, setCate] = useState([])
    let content = "";
    const getContent = (article) => {
        if (article && article.content) {
            content = article.content
        }
        return content
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (values, actions) => {
        setErrorMsg(null);
        console.log("values: ", values)
        try {
            if (props.article) {
                values.content = content
                await ArticleApi.update(props.article._id, values)
                successMessage("Sửa thành công.")
                content = ""
            } else {
                values.content = content
                await ArticleApi.insert(values)
                successMessage("Thêm thành công.")
                content = ""
            }
            setErrorMsg(null);
            handleCancel()
        } catch (error) {
            const { response } = error;
            const message = response.data.message
            setErrorMsg(message);
        }

    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <CModal size="xl" alignment="center" visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
            <CModalHeader>
                <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol>
                        <Formik
                            initialValues={props.article ? props.article : schema.initial}
                            validationSchema={schema.validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {(formProps) => {
                                const { isSubmitting } = formProps;
                                console.log("form value: ", formProps.errors)
                                return (

                                    <CForm
                                        className="row g-3 needs-validation"
                                        id='my-form'
                                        validated={false}
                                        onSubmit={formProps.handleSubmit}
                                        noValidate
                                    >

                                        {errorMsg && (<CCol>
                                            <h6 style={{ color: "red" }}>{errorMsg}</h6>
                                        </CCol>)}

                                        <CFormLabel htmlFor="exampleFormControlInput1">Nhóm bài học</CFormLabel>
                                        <CFormSelect
                                            name="category"
                                            aria-label="Default select example"
                                            onChange={formProps.handleChange}
                                            value={formProps.values.category}
                                            options={[{ label: "Không chọn", value: null }, ...props.categories?.map((value) => {
                                                const { _id, name } = value;
                                                return { label: name, value: _id }
                                            })]}
                                        />
                                        <CFormInput
                                            type="text"
                                            name="name"
                                            aria-describedby="validationCustom03Feedback"
                                            feedbackInvalid={formProps.errors.name}

                                            label="Tên"
                                            value={formProps.values.name}
                                            onChange={formProps.handleChange}
                                            required
                                            invalid={formProps.errors.name}
                                        />
                                        <CFormLabel htmlFor="exampleFormControlInput1">Ảnh</CFormLabel>
                                        <CCol >
                                            <MyImageUpload imageUrl={formProps.values.thumbail} onChange={(thumbail) => {
                                                formProps.setFieldValue("thumbail", thumbail);
                                            }} />
                                        </CCol>

                                    </CForm>
                                )
                            }}
                        </Formik>
                    </CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Nội dung</CFormLabel>
                    <MyEditor
                        content={getContent(props.article)}
                        onChange={(contentValue) => {
                            content = contentValue;
                        }}
                    />
                </CRow>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setIsModalVisible(false)}>
                    Close
                </CButton>
                <CButton color="primary" type="submit" form='my-form'>Save changes</CButton>
            </CModalFooter>
        </CModal>

    );
}
MyModal.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    query: PropTypes.object,
};

MyModal.defaultProps = {
    isModalVisible: false,
    setIsModalVisible: null,
    query: {
        articlename: "",
        page: 0,
        size: 10,
    },
};
export default MyModal;
