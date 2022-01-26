import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser, updateUser } from "../redux/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));
export default function EditUser() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.data);
  const { id } = useParams();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [error, setError] = useState("");
  const { name, email, contact, address } = state;
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !contact) {
      setError("Please input all input fields");
    } else {
      dispatch(updateUser(state, id));
      navigate("/");
      setError("");
    }
  };
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);
  return (
    <div>
      <div className="addUserBtn">Edit User</div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="name"
          value={name || ""}
          type="text"
          name="name"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="email"
          name="email"
          value={email || ""}
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="contact"
          name="contact"
          value={contact || ""}
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="address"
          name="address"
          value={address || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <div
          style={{
            display: "inline-block",
            margin: "5px",
          }}
        >
          {error && <h3 style={{ color: "red" }}>{error}</h3>}
        </div>
        <br />
        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
