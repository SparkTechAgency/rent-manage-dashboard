/* eslint-disable react/prop-types */
import { List, Modal } from "antd";
import { getImageUrl } from "../../utils/baseUrl";
import { FaFilePdf } from "react-icons/fa6";

// import dayjs from "dayjs";
// import { getImageUrl } from "../../utils/baseUrl";

const ViewPropertyDetailsModal = ({
  openPropertyDetailsModal,
  handleCancel,
  currentRecord,
}) => {
  //   const imageUrl = getImageUrl();

  console.log("currentRecord", currentRecord);
  const imageUrl = getImageUrl();

  return (
    <Modal
      title={
        <div className="">
          <h2 className="text-secondary-color text-2xl">Property Details</h2>
        </div>
      }
      open={openPropertyDetailsModal}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      <div className="px-10">
        <div className="">
          {/* Property Image */}
          <div className="flex flex-col items-start gap-2">
            <p className="text-xl font-semibold">Property Images</p>
            <div className="flex gap-4 items-center justify-center">
              {currentRecord?.images &&
                Array.isArray(currentRecord.images) &&
                currentRecord.images.map((image, index) => (
                  <div key={index} className="flex justify-center mb-4">
                    <img
                      // src={image}
                      src={`${imageUrl}/${image}`}
                      alt={currentRecord?.title}
                      className="w-40 h-40 sm:w-56 sm:h-56 rounded-lg mx-auto"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <p className="text-xl font-semibold">Property Files</p>
            <div className="flex gap-4 items-center justify-center">
              {currentRecord?.propertyFiles &&
                Array.isArray(currentRecord.propertyFiles) &&
                currentRecord.propertyFiles.map((file, index) => {
                  // Replace backslashes with forward slashes
                  const fileUrl = `${imageUrl}/${file.replace(/\\/g, "/")}`;
                  const fileName = file.replace(/\\/g, "/").split("/").pop();
                  const shortFileName =
                    fileName.length > 15
                      ? fileName.slice(0, 15) + "..."
                      : fileName;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-700 underline flex items-center gap-2 mx-5"
                      >
                        <FaFilePdf className="text-xl" />
                        <p>{shortFileName}</p>
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="text-xl sm:text-2xl font-bold mt-4">
            {currentRecord?.title}
          </div>

          {/* Property Details */}
          <div className="mt-5">
            <div className="grid lg:grid-cols-2 text-start gap-3 text-lg">
              {currentRecord?.landlordUserId?.fullName && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Owner:</div>
                  <div>{currentRecord?.landlordUserId?.fullName}</div>
                </div>
              )}
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Location:</div>
                  <div>{currentRecord?.address}</div>
                </div>
              )}
              {currentRecord?.status && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Status:</div>
                  {currentRecord.status === "verify_request" ? (
                    <p className="text-yellow-500">Requested To Verify</p>
                  ) : (
                    <p className="text-green-500">Verified</p>
                  )}
                </div>
              )}
              {currentRecord?.price && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Rent:</div>
                  <div>{currentRecord?.price}</div>
                </div>
              )}
              {currentRecord?.size && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Size:</div>
                  <div>{currentRecord?.size}</div>
                </div>
              )}
            </div>
          </div>

          {/* Property Description */}
          {currentRecord?.description && (
            <div className="mt-5">
              <h3 className="text-lg font-bold">Description:</h3>
              <p>{currentRecord?.description}</p>
            </div>
          )}

          {/* Display Owned Properties */}
          {currentRecord?.ownedProperties &&
            currentRecord?.ownedProperties.length > 0 && (
              <div className="mt-5">
                <h3 className="text-lg font-bold">Owned Properties:</h3>
                <List
                  bordered
                  dataSource={currentRecord.ownedProperties}
                  renderItem={(property) => (
                    <List.Item>
                      <strong>{property.name}</strong> - {property.type} -{" "}
                      {property.location} - {property.value}
                    </List.Item>
                  )}
                />
              </div>
            )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewPropertyDetailsModal;
