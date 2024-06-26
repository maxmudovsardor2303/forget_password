import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Notification from "../../utils/notification";
import { auth } from "../../services/auth";
import Modal from "../../components/modals/verify";

const index = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await auth.signUp(form);
      console.log(response);
      if (response.status === 200) {
        Notification({
          title: response.data.message,
          type: "success",
        })
        setOpen(true);
        setEmail(form.email);
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Something went wrong",
        type: "error",
      })
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("access_token")) {
        navigate("/main");
    }
  }, [])
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-3">
          <div className="card border-primary">
            <div className="card-header bg-primary">
              <h1 className="text-center title-white">Registrate</h1>
            </div>
            <div className="card-body border-primary">
              <form id="submit" onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  id="outlined-textarea"
                  label="Email"
                  className="form-control my-2"
                  onChange={handleChange}
                  placeholder="email"
                  name="email"
                  multiline
                />
                <TextField
                  type="text"
                  id="outlined-textarea"
                  label="Full name"
                  className="form-control my-2"
                  onChange={handleChange}
                  placeholder="full_name"
                  name="full_name"
                  multiline
                />
                <TextField
                  type="password"
                  id="outlined-textarea"
                  label="Password"
                  className="form-control my-2"
                  onChange={handleChange}
                  placeholder="password"
                  name="password"
                  multiline
                />
                <TextField
                  type="text"
                  id="outlined-textarea"
                  label="Phone number"
                  className="form-control my-2"
                  onChange={handleChange}
                  placeholder="phone_number"
                  name="phone_number"
                  multiline
                />
                <Button
                  onClick={() => navigate("/")}
                  sx={{ textTransform: "inherit" }}
                >
                  Already have an account?
                </Button>
              </form>
            </div>
            <div className="card-footer border-primary bg-white">
              <Modal open={open} setOpen={setOpen} email={email}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
