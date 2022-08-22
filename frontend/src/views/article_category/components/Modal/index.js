
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import VocabularyApi from "src/api/vocabularyCategoryApi";
import {successMessage, errorMessage} from 'src/views/components/MyMessage';
import {
    CCol,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CForm,
    CFormInput,

} from '@coreui/react'
export const VocabularyValues = {
    initial: {
        name: ""
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống")
    }),

};

function VocabularyModal(props) {
    const dispatch = useDispatch();
    const { isModalVisible, setIsModalVisible } = props;
    const [errorMsg, setErrorMsg] = useState(null);
    const [vocabulary, setVocabulary] = useState(null);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (values, actions) => {
        try {
            if(props.Vocabulary){
                await VocabularyApi.update(props.Vocabulary._id,values)
                successMessage("Sửa thành công.")
            }else{
                await VocabularyApi.insert(values)
                successMessage("Thêm thành công.")
            }
            setErrorMsg(null);
            handleCancel()
        } catch (error) {
            const { response } = error;
            const message = response.data.message
            setErrorMsg(message);
        }

    };

    return (
        <CModal alignment="center" visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
            <CModalHeader>
                <CModalTitle>Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <Formik
                    initialValues={props.vocabulary ? props.vocabulary : VocabularyValues.initial}
                    validationSchema={VocabularyValues.validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(props) => {
                        const { isSubmitting } = props;
                        console.log("form value: ", props.errors)
                        return (

                            <CForm
                                className="row g-3 needs-validation"
                                id='my-form'
                                validated={false}
                                onSubmit={props.handleSubmit}
                                noValidate
                            >

                                {errorMsg && (<CCol>
                                    <h6 style={{ color: "red" }}>{errorMsg}</h6>
                                </CCol>)}
                                <CFormInput
                                    type="text"
                                    name="name"
                                    aria-describedby="validationCustom03Feedback"
                                    feedbackInvalid={props.errors.name}

                                    label="Tên"
                                    value={props.values.name}
                                    onChange={props.handleChange}
                                    required
                                    invalid={props.errors.name}
                                />
                            </CForm>
                        )
                    }}
                </Formik>
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
VocabularyModal.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    query: PropTypes.object,
};

VocabularyModal.defaultProps = {
    isModalVisible: false,
    setIsModalVisible: null,
    query: {
        Vocabularyname: "",
        page: 0,
        size: 10,
    },
};
export default VocabularyModal;
