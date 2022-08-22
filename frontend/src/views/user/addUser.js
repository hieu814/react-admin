import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,

    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,

    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const CustomStyles = () => {
    const [validated, setValidated] = useState(false)
    const {id} = useParams();
    useEffect(()=>{
        
        console.log("useEffect: ",id)
    })
    const handleSubmit = (event) => {
        try {
            console.log("event: ", event.target.validationCustom01.value)
            const form = event.currentTarget
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            event.preventDefault();
        } catch (error) {
            console.log("error: ", error)
        }

        setValidated(true)
    }

    // const {id} = useParams();


    return (
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            
        >
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom01">Email</CFormLabel>
                <CFormInput type="text" id="validationCustom01" defaultValue={id} required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
                <CFormInput type="text" id="validationCustom02" defaultValue="Otto" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
                <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
                <CInputGroup className="has-validation">
                    <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                    <CFormInput
                        type="text"
                        id="validationCustomUsername"
                        defaultValue=""
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                </CInputGroup>
            </CCol>
            <CCol md={6}>
                <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
                <CFormInput type="text" id="validationCustom03" required />
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="validationCustom04">City</CFormLabel>
                <CFormSelect id="validationCustom04">
                    <option disabled>Choose...</option>
                    <option>...</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
            </CCol>
            <CCol md={3}>
                <CFormLabel htmlFor="validationCustom05">City</CFormLabel>
                <CFormInput type="text" id="validationCustom05" required />
                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
            </CCol>
            <CCol xs={12}>
                <CButton color="primary" type="submit">
                    Submit form
                </CButton>
            </CCol>
        </CForm>
    )
}



const Validation = () => {
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Validation</strong> <small>Custom styles</small>
                    </CCardHeader>
                    <CCardBody>

                        <DocsExample href="forms/validation">{CustomStyles()}</DocsExample>
                    </CCardBody>
                </CCard>
            </CCol>

        </CRow>
    )
}

export default Validation
