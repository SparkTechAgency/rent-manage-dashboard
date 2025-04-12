/* eslint-disable no-unused-vars */
import { Form, Input, Typography } from "antd";
// import profileImage from "/images/profileImage.png";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { useUserProfileQuery } from "../../Redux/api/userApi";
import { useState } from "react";
import { getImageUrl } from "../../utils/baseUrl";
import { AllImages } from "../../../public/images/AllImages";

const Profile = () => {
  // const { data: userProfile, refetch } = useUserProfileQuery();
  // console.log(userProfile);
  const imageUrl = getImageUrl();

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
  });

  // useEffect(() => {
  //   if (userProfile?.data) {
  //     const profileDataApi = userProfile.data;
  //     console.log(profileDataApi);

  //     setProfileData({
  //       fullName: profileDataApi.fullName,
  //       email: profileDataApi.email,
  //       image: profileDataApi.image,
  //       // phoneCode: profileDataApi.phoneCode || "BD",
  //       address: profileDataApi.address,
  //       phoneNumber: profileDataApi.phoneNumber,
  //       role: profileDataApi.role || "Undefined",
  //     });
  //   }
  // }, [userProfile]);

  // useEffect(() => {
  //   if (location.state?.updated) {
  //     refetch();
  //   }
  // }, [location.state, refetch]);

  const handleEditClick = () => {
    // navigate("edit-profile", { state: { profileData } });
    navigate("edit-profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-20">
      <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-8">
            {profileData?.image ? (
              <img
                className="h-40 w-40 relative"
                src={`${imageUrl}/${
                  profileData.image
                }?t=${new Date().getTime()}`}
                alt="Profile"
              />
            ) : (
              <img
                className="h-40 w-40 relative"
                src={AllImages.userImage}
                alt="Profile"
              />
            )}

            <p className="text-5xl font-semibold">{profileData?.fullName}</p>
          </div>
          {/* < to="edit-profile" className="hover:text-primary-color"> */}
          <button
            onClick={handleEditClick}
            className="bg-[#363636] text-white px-5 py-3 rounded-lg"
          >
            <div className="flex gap-1 ">
              <EditOutlined style={{ color: "#FAFAFA" }} />
              <p className="">Edit Profile</p>
            </div>
          </button>
        </div>
        <div className="flex flex-col items-center text-white mt-5">
          <Form layout="vertical" className="bg-transparent p-4 w-full">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item className="text-white ">
              <Input
                // value={profileData?.email}
                value="user@email.com"
                placeholder="Enter your email"
                readOnly
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Full Name
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value="The User"
                // value={profileData?.fullName}
                placeholder="Enter your full name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
              />
            </Form.Item>
            {profileData?.address && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Address
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profileData.address}
                    placeholder="Enter your contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
            )}
            {profileData?.phoneNumber && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Contact Number
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profileData?.phoneNumber}
                    placeholder="Enter your contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
