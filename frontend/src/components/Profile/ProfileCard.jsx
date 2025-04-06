import React, { useState } from "react";
import "./profileCard.scss";
import Button from "../Shared/Button/Button";
import gravatar from "gravatar";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Shared/Modal/Modal";
import { Form } from "antd";
import InputField from "../Shared/InputField/InputField";
import SelectField from "../Shared/SelectField/SelectField";

const ProfileCard = ({ useri }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    ...user,
    socialMedia: {
      facebook: useri?.socialMedia?.facebook || "",
      instagram: useri?.socialMedia?.instagram || "",
      twitter: useri?.socialMedia?.twitter || "",
    },
  });


  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleEditingProfile = () => {
    setIsEditing(true);
    // authService
    //   .getUser(loggedUser.user._id)
    //   .then((res) => {
    //     const fetchedUserData = res.data;
    //     setUserData({
    //       ...loggedUser.user,
    //       interests: (loggedUser.user.interests || []).join(", "),
    //     });
    //     form.setFieldsValue(fetchedUserData);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     message.error("Failed to fetch user data");
    //   });
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleInputChange = (fieldName, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSaveEditedData = () => {
    // form.validateFields().then((values) => {
    //   if (profilePicture) {
    //     const formData = new FormData();
    //     formData.append("images", profilePicture);
    //     authService
    //       .uploadProfilePicture(loggedUser.user._id, formData)
    //       .then((res) => {
    //         const profileImage = res.data;
    //         dispatch(
    //           setLoggedUser({
    //             ...loggedUser,
    //             user: {
    //               ...loggedUser.user,
    //               profileImg: profileImage,
    //             },
    //           })
    //         );
    //         message.success("Profile picture uploaded successfully");
    //         setProfilePicture(null);
    //         setUploadedImage(null);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         message.error("Failed to upload profile picture");
    //       });
    //   }

    //   const interestsArray =
    //     typeof values.interests === "string"
    //       ? values.interests.split(",").map((interest) => interest.trim())
    //       : [];

    //   const updatedFields = {
    //     ...values,
    //     interests: interestsArray,
    //     socialMedia: {
    //       facebook: values["socialMedia.facebook"],
    //       twitter: values["socialMedia.twitter"],
    //       instagram: values["socialMedia.instagram"],
    //     },
    //   };

    //   authService
    //     .updateUser(updatedFields, loggedUser.user._id)
    //     .then((res) => {
    //       const updatedUser = res.data;
    //       dispatch(setLoggedUser({ ...loggedUser, user: updatedUser }));
    //       setUserData(updatedUser);
    //       message.success("User data updated successfully!");
    //       handleCloseModal();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       message.error("Failed to update user data");
    //     });
    // });
  };

  return (
    <div className="profile-card">
      <div className="top-profile-content"></div>
      <div className="bottom-profile-content">
        <div className="profile-image">
            <img
              src={gravatar.url(user.email, { s: "200", d: "identicon" })}
              alt="profile image"
            />
        </div>
        <h4 className="profile-name">
          {useri?.firstName} {useri?.lastName}
        </h4>
        <div className="profile-stats">
          {useri?.eventsAttending?.length > 0 && (
            <div className="profile-stat">
              <span className="stat-count">
                {useri?.eventsAttending?.length}
              </span>
              <span className="stat-desc">Events</span>
            </div>
          )}
        </div>
        <Button
          className="basic-btn"
          type="button"
          onClick={() => handleEditingProfile()}
        >
          Edit profile
        </Button>
      </div>
      {isEditing && (
        <Modal onClose={() => handleCloseModal()}>
          <h2 className="content-title">Edit Profile</h2>
          <Form
            form={form}
            layout="vertical"
            className="form"
            initialValues={userData}
          >
            <Form.Item></Form.Item>
            <Form.Item label="Description" name="description">
              <textarea
                className="text-input"
                rows={4}
                placeholder="Description..."
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Age" name="age">
              <InputField
                classname="text-input"
                type="number"
                label="Age"
                onChange={(value) => handleInputChange("age", value)}
              />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <SelectField
                id="gender-filter"
                classname="select-field"
                options={genderOptions}
                onChange={(value) => handleInputChange("gender", value)}
              />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <InputField
                classname="text-input"
                type="text"
                label="Location"
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <InputField
                classname="text-input"
                type="text"
                label="Phone Number"
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Facebook" name="socialMedia.facebook">
              <InputField
                classname="text-input"
                type="text"
                label="Facebook"
                onChange={(e) =>
                  handleInputChange("socialMedia.facebook", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Instagram" name="socialMedia.instagram">
              <InputField
                classname="text-input"
                type="text"
                label="Instagram"
                onChange={(e) =>
                  handleInputChange("socialMedia.instagram", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item label="Twitter" name="socialMedia.twitter">
              <InputField
                classname="text-input"
                type="text"
                label="Twitter"
                onChange={(e) =>
                  handleInputChange("socialMedia.twitter", e.target.value)
                }
              />
            </Form.Item>
            <Button
              className="basic-btn green"
              type="submit"
              onClick={() => handleSaveEditedData()}
            >
              Save
            </Button>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default ProfileCard;
