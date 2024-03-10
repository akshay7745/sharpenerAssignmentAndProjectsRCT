import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { authContext } from "../contexts/AuthContextProvider";
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    imageUrl: "",
  });

  const { name, imageUrl } = profile;
  const { token } = useContext(authContext);
  const onChangeHandler = (e) => {
    setProfile((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const saveProfile = async (data) => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCB10Q6a5p0jTcYwYXRu5YHzmOQ8UefSy4`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Sending request");
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
      console.log(error);
      alert(error.message);
    }
  };

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
    <Row className="justify-content-center ">
      <Col md={5}>
        <Row>
          <Col>
            <h3 className="text-center">Please complete your profile</h3>
          </Col>
        </Row>
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
    </Row>
  );
};

export default Profile;
