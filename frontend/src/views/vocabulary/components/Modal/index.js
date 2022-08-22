
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import userApi from "../../../../api/usersApi";
import { ROLES } from 'src/constants/constant';
import {successMessage, errorMessage} from 'src/views/components/MyMessage';
import {
    CFormFeedback,
    CFormLabel,
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
    CFormSelect
} from '@coreui/react'
export const userValues = {
    initial: {
        email: "",
        name: "",
        username: "",
        password: "",
        role: ""
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống"),
        // username: Yup.string().required("Tài khoản không được bỏ trống"),
        password: Yup.string().required("Mật khẩu không được bỏ trống").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 là số, hoặc 1 ký tự đặc biệt"),
        email: Yup.string().email("Email không hợp lệ").required("Email không được bỏ trống"),
    }),
    editValidationSchema: Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống"),
        // username: Yup.string().required("Tài khoản không được bỏ trống"),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 là số, hoặc 1 ký tự đặc biệt"),
        email: Yup.string().email("Email không hợp lệ").required("Email không được bỏ trống"),
    }),
};

function UserModal(props) {
    const dispatch = useDispatch();
    const { isModalVisible, setIsModalVisible } = props;
    const [errorMsg, setErrorMsg] = useState(null);
    const [user, setUser] = useState(null);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = async (values, actions) => {
        try {
            if(props.user){
                await userApi.updateUser(props.user._id,values)
                successMessage("Sửa thành công.")
            }else{
                await userApi.addUser(values)
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
                    initialValues={props.user ? props.user : userValues.initial}
                    validationSchema={props.user ? userValues.editValidationSchema : userValues.validationSchema}
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
                                    name="email"
                                    aria-describedby="validationCustom03Feedback"
                                    feedbackInvalid={props.errors.email}

                                    label="Email"
                                    value={props.values.email}
                                    onChange={props.handleChange}
                                    required
                                    invalid={props.errors.email}
                                />
                                <CFormInput
                                    type="password"
                                    name="password"
                                    aria-describedby="validationCustom03Feedback"
                                    feedbackInvalid={props.errors.password}

                                    label="Password"
                                    value={props.values.password}
                                    onChange={props.handleChange}
                                    required
                                    invalid={props.errors.password}
                                />
                                <CFormInput
                                    type="name"
                                    name="name"
                                    aria-describedby="validationCustom03Feedback"
                                    feedbackInvalid={props.errors.name}

                                    label="Username"
                                    value={props.values.name}
                                    onChange={props.handleChange}
                                    required
                                    invalid={props.errors.name}
                                />
                                <CCol md={3}>
                                    <CFormLabel htmlFor="validationCustom04">Quyền</CFormLabel>
                                    <CFormSelect name="role" value={props.values.role} onChange={props.handleChange}>
                                        <option value={ROLES.USER}>Người dùng</option>
                                        <option value={ROLES.EDITTOR}>Nhân viên</option>
                                        <option value={ROLES.ADMIN}>Admin</option>
                                    </CFormSelect>
                                    <CFormFeedback valid={!props.errors.role}>{props.errors.role}</CFormFeedback>
                                </CCol>


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
UserModal.propTypes = {
    isModalVisible: PropTypes.bool,
    setIsModalVisible: PropTypes.func,
    query: PropTypes.object,
};

UserModal.defaultProps = {
    isModalVisible: false,
    setIsModalVisible: null,
    query: {
        username: "",
        page: 0,
        size: 10,
    },
};
export default UserModal;
