import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Space, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import VocabularyApi from "src/api/vocabularyApi";
import { successMessage, errorMessage } from 'src/views/components/MyMessage';
import {
    ImageField,
    InputField,
    TextAreaField,
    UploadField,
} from "src/views/components/customfield";
import { FastField, Form, Formik } from "formik";
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
    CFormLabel,

} from '@coreui/react'
export const schema = {
    initial: {
        word: "",
        mean: "",
        definition: "",
        pronounce: "",
        image: "",
        audio: "",
        type: "",
    },

    validationSchema: Yup.object().shape({
        word: Yup.string().required("Tên không được bỏ trống")

    }),

};

function MyModal(props) {
    const dispatch = useDispatch();
    const { isModalVisible, setIsModalVisible } = props;
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCate] = useState([])
    const handleCancel = () => {
        setErrorMsg(null)
        setIsModalVisible(false);
    };

    const handleSubmit = async (values, actions) => {
        setErrorMsg(null);
        setIsSubmitting(true);

        try {


            const { _id, image } = values;

            const vocabulary = { ...values };
            delete vocabulary.image;

            let response;

            if (!props.vocabulary) {
                response = await VocabularyApi.insert(vocabulary);
            } else {
                response = await VocabularyApi.update(_id, vocabulary);
            }
            // console.log("------------------ response ",response)
            if (image && typeof image === "object") {
                const vocabularyId = !props.vocabulary ? response.data._id : _id;
                await VocabularyApi.updateImage(vocabularyId, image);
            }
            setErrorMsg(null);
            if (props.vocabulary) {
                successMessage("Sửa thành công.")
            } else {
                successMessage("Thêm thành công.")
            }
            handleCancel()
            setIsSubmitting(false);
        } catch (error) {
            const { response } = error;
            const message = response.data.message
            setErrorMsg(message);

        }
        setIsSubmitting(false);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <CModal size="xl" alignment="center" visible={isModalVisible} onClose={() => handleCancel()}>
            <CModalHeader>
                <CModalTitle>Thao tác</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CRow>

                    <CCol>
                        <Formik
                            initialValues={props.vocabulary ? props.vocabulary : schema.initial}
                            validationSchema={schema.validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {(formikProps) => {
                                const { values } = formikProps;
                                return (
                                    <Form id='my-form'
                                    >
                                        {errorMsg && (<CCol>
                                            <h6 style={{ color: "red" }}>{errorMsg}</h6>
                                        </CCol>)}
                                        <Space
                                            direction="vertical"
                                            size="middle"
                                            style={{ width: "100%" }}
                                        >
                                            <FastField component={InputField} name="id" type="hidden" />
                                            <FastField
                                                name="word"
                                                component={InputField}
                                                title="Từ vựng"
                                                titleCol={6}
                                                maxLength={200}
                                                inputCol={18}
                                                isRequire={true}
                                            />
                                            <FastField
                                                name="type"
                                                component={InputField}
                                                title="Loại từ"
                                                titleCol={6}
                                                maxLength={200}
                                                inputCol={18}
                                                isRequire={true}
                                            />
                                            <FastField
                                                name="pronounce"
                                                component={InputField}
                                                title="Phát âm"
                                                titleCol={6}
                                                maxLength={200}
                                                inputCol={18}
                                                isRequire={true}
                                            />
                                            <FastField
                                                name="definition"
                                                component={TextAreaField}
                                                title="Định nghĩa"
                                                maxLength={200}
                                                titleCol={6}
                                                inputCol={18}
                                                isRequire={true}
                                                rows={3}
                                            />
                                            <FastField
                                                name="mean"
                                                component={InputField}
                                                title="Nghĩa tiếng Việt"
                                                titleCol={6}
                                                maxLength={200}
                                                inputCol={18}
                                                isRequire={true}
                                            />
                                            <FastField
                                                name="example"
                                                component={InputField}
                                                title="Ví dụ"
                                                titleCol={6}
                                                maxLength={200}
                                                inputCol={18}
                                                isRequire={true}
                                            />
                                            <FastField
                                                name="sound"
                                                component={UploadField}
                                                title="Âm thanh"
                                                titleCol={6}
                                                inputCol={18}
                                                fileType="audio/*"
                                            />
                                            <FastField
                                                name="image"
                                                component={ImageField}
                                                title="Ảnh"
                                                titleCol={6}
                                                inputCol={18}
                                            />
                                        </Space>

                                    </Form>
                                );
                            }}
                        </Formik>
                    </CCol>
                </CRow>

            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => handleCancel()}>
                    Close
                </CButton>
                <CButton color="primary" type="submit" form='my-form'>
                    {isSubmitting && (
                        <Spin
                            indicator={
                                <LoadingOutlined style={{ color: "white" }} spin />
                            }
                        />
                    )}
                    Lưu
                </CButton>
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
        vocabularyname: "",
        page: 0,
        size: 10,
    },
};
export default MyModal;
