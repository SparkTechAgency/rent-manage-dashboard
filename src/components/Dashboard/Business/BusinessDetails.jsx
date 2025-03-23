import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAllServicesQuery } from "../../../Redux/api/serviceApi";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils/baseUrl";

const BusinessDetails = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const businessData = location.state?.businessData;
  // console.log(businessData);

  const {
    data: allServices,
    isLoading: isFetching,
    error: fetchError,
  } = useAllServicesQuery();
  const servicesData = allServices?.data?.result;

  const imageUrl = getImageUrl();

  useEffect(() => {
    console.log("API Response:", allServices);
    if (Array.isArray(servicesData) && servicesData.length > 0) {
      setServices(servicesData);
    }
  }, [servicesData]);

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  console.log(services);
  return (
    <div className="min-h-screen">
      {" "}
      <div className="flex items-center">
        <div>
          <Link to="/business">
            <MdOutlineArrowBackIosNew className="text-xl sm:text-2xl lg:text-3xl text-secondary-color mt-1" />
          </Link>
        </div>
        <h2 className="text-secondary-color text-4xl ">Business Details</h2>
      </div>
      <div className="mt-10 p-10 max-w-4xl mx-auto bg-[#FEF2F599] rounded-lg border border-[#FE5C8E]">
        <div className="">
          <div className="flex justify-center items-center p-4 border-b">
            {/* Avatar */}
            <img
              src={`${imageUrl}/${businessData?.businessId?.image}`}
              alt="business"
              className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg mr-4"
            />
            <div className="text-xl sm:text-3xl font-bold">
              {businessData?.businessId?.fullName}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid md:grid-cols-2 text-start gap-4 text-lg">
              <div className="sm:flex gap-1">
                <div className="font-bold">Email:</div>
                <div> {businessData?.businessId?.email}</div>
              </div>
              {businessData?.businessId?.contactNumber && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact number:</div>
                  <div> {businessData?.businessId?.contactNumber}</div>
                </div>
              )}
              {businessData?.businessId?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Address:</div>
                  <div> {businessData?.businessId?.address}</div>
                </div>
              )}
              {businessData?.businessId?.licenseId && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">License ID:</div>
                  <div> {businessData?.businessId?.licenseId}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-[#FFFFFF] rounded p-3">
          <div className="flex justify-between p-6">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
              <h1 className="text-3xl font-bold text-secondary-color">
                All Services
              </h1>
            </div>
          </div>
          <div className="px-2 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={`/services/${service?._id}`}
                  state={service}
                  className="hover:text-base-color"
                >
                  <div className="flex flex-col gap-2 bg-[#FEF2F5] border border-[#FEF2F5] px-4 py-3 rounded-md">
                    <div className="relative rounded-md">
                      <img
                        src={`${imageUrl}/${service?.serviceImage}`}
                        alt="service"
                        className="w-full h-[180px] sm:h-[220px] object-cover rounded-md"
                      />
                      <div className="w-full bg-[#18191B88] h-full absolute top-0 left-0 flex items-end rounded-md">
                        <h1 className="text-[#FFEBF1] text-xl md:text-3xl p-3">
                          {service.serviceName}
                        </h1>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mt-3">
                        <img
                          src={`${imageUrl}/${service?.businessUserId?.image}`}
                          className="h-6 lg:h-8 w-6 lg:w-8 rounded-full"
                          alt="business"
                        />
                        <h1 className="text-2xl font-medium">
                          {service?.businessUserId?.fullName}
                        </h1>
                      </div>
                      <p className="text-lg mt-1">
                        Price: <span>£{service?.servicePrice}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
