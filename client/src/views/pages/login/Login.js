
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from 'react-router-dom'
import { ROLES } from 'src/constants/constant'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import authApi from "../../../api/authApi";
import { successMessage, errorMessage } from '../../components/MyMessage'
import { checkProfile } from '../../../stores/global/globalSlice'

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.global);

  const handleSubmit = async (event) => {
    try {

      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      event.preventDefault();
      const { token } = await authApi.login({
        "password": event.target.password.value,
        "email": event.target.email.value
      });
      localStorage.setItem("token", token);
      const result = await dispatch(checkProfile());
      if(!result.payload){
        errorMessage(`Bạn không có quyền`)
        return
      }
      const { role } = result.payload;
      
      if (role === ROLES.ADMIN || role === ROLES.EDITTOR) {

        successMessage(`Đăng nhập thành công`)
        return;
      } else {
        localStorage.removeItem("token");
        errorMessage(`Bạn không có quyền`)
      }

    } catch (error) {
      console.log("error: ", error)
      errorMessage("Đăng nhập thất bại")
      localStorage.removeItem("token");
    }

  }
  const googleLogin = async () => {
    try {

      const { token } = await authApi.googleLogin();
      dispatch(checkProfile());
      localStorage.setItem("token", token);
      successMessage("Đăng nhập thành công: ")
      return;
    } catch (error) {
      console.log("error: ", error)
      errorMessage("Tài khoản hoặc mật khẩu không chính xác ", error)
    }

  }
  return (

    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {isLogin ?
        (<Navigate to="/dashboard" />)
        : (
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={(e) => handleSubmit(e)}
                      // validated={validated}

                      >

                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput id="email" placeholder="Username" autoComplete="username" required />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            id="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                          />
                          <CFormFeedback invalid>Vui lòng nhập mật khẩu</CFormFeedback>
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton color="primary" className="px-4" type="submit">
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <Link to="/register">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>
                            Register Now!
                          </CButton>
                        </Link>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={googleLogin}>
                            Login wit google
                          </CButton>
                        </CCol>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        )
      }
    </div>
  )
}

export default Login
