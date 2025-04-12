/* eslint-disable react/prop-types */
import { List, Modal } from "antd";
// import dayjs from "dayjs";
// import { getImageUrl } from "../../utils/baseUrl";

const ViewPropertyDetailsModal = ({
  openPropertyDetailsModal,
  handleCancel,
  currentRecord,
}) => {
  //   const imageUrl = getImageUrl();

  console.log("currentRecord", currentRecord);

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
      <div className="p-10">
        <div className="">
          {/* Property Image */}
          <div className="flex gap-4 items-center justify-center">
            {currentRecord?.image &&
              Array.isArray(currentRecord.image) &&
              currentRecord.image.map((image, index) => (
                <div key={index} className="flex justify-center mb-4">
                  <img
                    src={image}
                    alt={currentRecord?.title}
                    className="w-40 h-40 sm:w-56 sm:h-56 rounded-lg mx-auto"
                  />
                </div>
              ))}
          </div>

          <div className="text-xl sm:text-2xl font-bold mt-4">
            {currentRecord?.title}
          </div>

          {/* Property Details */}
          <div className="mt-5">
            <div className="grid lg:grid-cols-2 text-start gap-4 text-lg">
              {currentRecord?.owner && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Owner:</div>
                  <div>{currentRecord?.owner}</div>
                </div>
              )}
              {currentRecord?.location && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Location:</div>
                  <div>{currentRecord?.location}</div>
                </div>
              )}
              {currentRecord?.status && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Status:</div>
                  <div>{currentRecord?.status}</div>
                </div>
              )}
              {currentRecord?.price && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Price:</div>
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
