import React, { useState } from 'react'
import { useQuery } from "src/views/Exam/hooks";
import authApi from "src/api/authApi";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import {successMessage} from 'src/views/components/MyMessage';
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const query = useQuery();
  const [msg, setMsg] = useState("")
  const token = query.get("token");
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      const password = event.target.password.value
      
      console.log("password: ", password)
      await authApi.passwordReset({
        token,
        password
      })
      setMsg(null)
      navigate("/login")
    } catch (error) {
      console.log("error: ", error)
      setMsg(error.response.data.message)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}
                // validated={validated}
                >
                  <h1>Reset password</h1>
                  {/* <p className="text-medium-emphasis">Reset password</p> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      feedbackInvalid={msg}
                      invalid= {msg}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">Reset</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
