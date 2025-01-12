import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../contexts/authSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    imageUrl: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, imageUrl } = profile;
  const token = useSelector((store) => store.authentication.token);
  console.log("getting token", token);
  const onChangeHandler = (e) => {
    setProfile((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const getProfileData = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
          import.meta.env.VITE_AUTH_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        const resData = await res.json();
        const { displayName, photoUrl } = resData.users[0];
        console.log("Getting profile 1st time", resData.users);
        setProfile({
          name: displayName || "",
          imageUrl: photoUrl || "",
        });
      } else {
        const resData = await res.json();
        const error = resData.error.message;
        throw new Error(error);
      }
    } catch (error) {
      alert("Token expired");
      dispatch(logout());
      navigate("/login");
    }
  };

  const saveProfile = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
          import.meta.env.VITE_AUTH_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // console.log("Sending request");
      alert("Updating profile");
      if (res.ok) {
        const resData = await res.json();
        console.log(resData, "sending request to backend");
        return resData;
      } else {
        const resData = await res.json();
        // throw new Error(resData.error.message);
        console.log(resData);
      }
    } catch (error) {
      // console.log(error);
      alert(error.message);
      dispatch(logout());
      navigate("/login");
    }
  };

  useEffect(() => {
    getProfileData({ idToken: token });
  }, [token]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(profile);
    console.log("form submitted");
    saveProfile({
      idToken: token,
      displayName: name,
      photoUrl: imageUrl,
      returnSecureToken: true,
    });
  };
  return (
    <>
      <Row>
        <Col className="mt-5">
          <h3 className="text-center">
            {profile.name === "" && profile.imageUrl === ""
              ? "Please complete your profile"
              : "Profile completed"}
          </h3>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col sm={9} className="border border-black rounded-2 p-3">
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="full_name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required={true}
                onChange={onChangeHandler}
                name="name"
                type="text"
                value={name}
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="img_url">
              <Form.Label>Profile Phote URL</Form.Label>
              <Form.Control
                onChange={onChangeHandler}
                name="imageUrl"
                value={imageUrl}
                type="text"
                placeholder="Enter Image url"
                required={true}
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Button type="submit" variant="warning">
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className="border border-black rounded-2 text-center p-3">
          <Figure className="text-center">
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={
                profile.imageUrl
                  ? profile.imageUrl
                  : "https://thumbs.dreamstime.com/z/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg?w=768"
              }
            />
            <Figure.Caption>
              {profile.imageUrl
                ? `${profile.name}'s Profile picture`
                : "No profile picture set"}
            </Figure.Caption>
          </Figure>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
