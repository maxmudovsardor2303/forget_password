// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import SnackbarWithDecorators from "../../components/notification";
// import { auth } from "../../services/auth";
// import Notification from "../../utils/notification";
// import "./login.css";

// // Validation schema using Yup
// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const Index = () => {
//   const [open, setOpen] = useState(false);
//   const [type, setType] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem("access_token")) {
//       navigate("/main");
//     }
//   }, [navigate]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const response = await auth.signIn(values);
//       console.log(response);
//       if (response.status === 200) {
//         localStorage.setItem("access_token", response.data.access_token);
//         Notification({
//           title: "Successfully logged in",
//           type: "success",
//         });
//         navigate("/main");
//       }
//     } catch (error) {
//       console.error(error);
//       Notification({
//         title: "Failed login",
//         type: "error",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const moveRegister = () => {
//     navigate("/sign-up");
//   };

//   return (
//     <>
//       <div className="container">
//         <SnackbarWithDecorators open={open} setOpen={setOpen} type={type} />
//         <div className="row mt-5">
//           <div className="col-md-6 offset-3">
//             <div className="card border-primary">
//               <div className="card-header bg-primary">
//                 <h1 className="text-center title-white ">Login</h1>
//               </div>
//               <div className="card-body border-primary">
//                 <Formik
//                   initialValues={{ email: "", password: "" }}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSubmit}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form id="login">
//                       <div className="form-group my-2">
//                         <Field
//                           as={TextField}
//                           type="email"
//                           id="outlined-textarea"
//                           label="Email"
//                           className="form-control"
//                           placeholder="username"
//                           name="email"
//                           fullWidth
//                         />
//                         <ErrorMessage name="email" component="div" className="text-danger" />
//                       </div>
//                       <div className="form-group my-2">
//                         <Field
//                           as={TextField}
//                           type="password"
//                           id="outlined-textarea"
//                           label="Password"
//                           className="form-control"
//                           placeholder="password"
//                           name="password"
//                           fullWidth
//                         />
//                         <ErrorMessage name="password" component="div" className="text-danger" />
//                       </div>
//                       <Button
//                         sx={{ textTransform: "inherit" }}
//                         onClick={moveRegister}
//                         disabled={isSubmitting}
//                       >
//                         Register
//                       </Button>
//                       <Button
//                         sx={{ textTransform: "inherit" }}
//                         onClick={moveRegister}
//                         disabled={isSubmitting}
//                       >
//                         Forget password
//                       </Button>
//                     <div className="card-footer border-primary bg-white">
//                     <Button
//                         type="submit"
//                         form="login"
//                         variant="contained"
//                         disabled={isSubmitting}
//                       >
//                         Login
//                       </Button>
//                     </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SnackbarWithDecorators from "../../components/notification";
import { auth } from "../../services/auth";
import Notification from "../../utils/notification";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./login.css";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Validation schema for email submission
const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

// Validation schema for code and new password submission
const codeValidationSchema = Yup.object().shape({
  code: Yup.string().required("Verification code is required"),
  newPassword: Yup.string().required("New password is required"),
});

const Index = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/main");
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.signIn(values);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Successfully logged in",
          type: "success",
        });
        navigate("/main");
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Failed login",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.requestPasswordReset(values.email);
      if (response.status === 200) {
        setEmail(values.email);
        localStorage.setItem("reset_email", values.email);
        setEmailModalOpen(false);
        setCodeModalOpen(true);
        Notification({
          title: "Verification code sent",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Failed to send verification code",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCodeSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.resetPassword({
        email: localStorage.getItem("reset_email"),
        code: values.code,
        newPassword: values.newPassword,
      });
      if (response.status === 200) {
        localStorage.removeItem("reset_email");
        setCodeModalOpen(false);
        Notification({
          title: "Password reset successfully",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Failed to reset password",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const moveRegister = () => {
    navigate("/sign-up");
  };

  const handleForgotPassword = () => {
    setEmailModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <SnackbarWithDecorators open={open} setOpen={setOpen} type={type} />
        <div className="row mt-5">
          <div className="col-md-6 offset-3">
            <div className="card border-primary">
              <div className="card-header bg-primary">
                <h1 className="text-center title-white ">Login</h1>
              </div>
              <div className="card-body border-primary">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form id="login">
                      <div className="form-group my-2">
                        <Field
                          as={TextField}
                          type="email"
                          id="outlined-textarea"
                          label="Email"
                          className="form-control"
                          placeholder="username"
                          name="email"
                          fullWidth
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>
                      <div className="form-group my-2">
                        <Field
                          as={TextField}
                          type="password"
                          id="outlined-textarea"
                          label="Password"
                          className="form-control"
                          placeholder="password"
                          name="password"
                          fullWidth
                        />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>
                      <Button
                        sx={{ textTransform: "inherit" }}
                        onClick={moveRegister}
                        disabled={isSubmitting}
                      >
                        Register
                      </Button>
                      <Button
                        sx={{ textTransform: "inherit" }}
                        onClick={handleForgotPassword}
                        disabled={isSubmitting}
                      >
                        Forget password
                      </Button>
                    <div className="card-footer border-primary bg-white">
                    <Button
                        type="submit"
                        form="login"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        Login
                      </Button>
                    </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={emailModalOpen} onClose={() => setEmailModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <h2>Reset Password</h2>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ isSubmitting }) => (
              <Form id="email-reset">
                <div className="form-group my-2">
                  <Field
                    as={TextField}
                    type="email"
                    id="outlined-textarea"
                    label="Email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    fullWidth
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <Button
                  type="submit"
                  form="email-reset"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Send Verification Code
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Modal open={codeModalOpen} onClose={() => setCodeModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <h2>Enter Verification Code</h2>
          <Formik
            initialValues={{ code: "", newPassword: "" }}
            validationSchema={codeValidationSchema}
            onSubmit={handleCodeSubmit}
          >
            {({ isSubmitting }) => (
              <Form id="code-reset">
                <div className="form-group my-2">
                  <Field
                    as={TextField}
                    type="text"
                    id="outlined-textarea"
                    label="Verification Code"
                    className="form-control"
                    placeholder="Enter the code"
                    name="code"
                    fullWidth
                  />
                  <ErrorMessage name="code" component="div" className="text-danger" />
                </div>
                <div className="form-group my-2">
                  <Field
                    as={TextField}
                    type="password"
                    id="outlined-textarea"
                    label="New Password"
                    className="form-control"
                    placeholder="Enter new password"
                    name="newPassword"
                    fullWidth
                  />
                  <ErrorMessage name="newPassword" component="div" className="text-danger" />
                </div>
                <Button
                  type="submit"
                  form="code-reset"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Reset Password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

// Styles for modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Index;
