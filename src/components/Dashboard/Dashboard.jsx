import { ConfigProvider, Select } from "antd";
// import Area_Chart from "../Chart/AreaChart";
import { Link } from "react-router-dom";

import { AllIcons } from "../../../public/images/AllImages";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa";

import { useState } from "react";

import ViewUserModal from "../UI/ViewUserModal";
import DeleteUserModal from "../UI/DeleteUserModal";
import IncomeBarChart from "../Chart/IncomeBarChart";
// import { useAllCustomerQuery } from "../../Redux/api/dashboardApi";
// import { useAllUsersQuery } from "../../Redux/api/userApi";
import PropertyTable from "../Tables/PropertyTable";
import { usePropertiesQuery } from "../../Redux/api/propertyApi";
import { useAllUsersQuery } from "../../Redux/api/userApi";
import { useAdminRevenueQuery } from "../../Redux/api/earningApi";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  // const [selectedHour, setSelectedHour] = useState("24hour");
  // const [selectedDays, setSelectedDays] = useState("7day");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: allUsers, isLoading, isError } = useAllUsersQuery();
  const {
    data: adminRevenue,
    isLoading: loadingRevenue,
    isError: revenueError,
  } = useAdminRevenueQuery();
  const {
    data: allProperties,
    isLoading: propertyLoading,
    isErrorProperty,
  } = usePropertiesQuery();

  const users = allUsers?.data || [];
  const properties = allProperties?.data || [];
  const adminRevenueData = adminRevenue?.data?.result || [];

  // console.log(users);
  // console.log(properties);
  // console.log(adminRevenueData);

  const tenantData = users?.filter((user) => user.role === "tenant");
  const landlordData = users?.filter((user) => user.role === "landlord");
  const approvedProperties = properties?.filter(
    (property) => property.status === "verified"
  );

  const totalAdminAmount = adminRevenueData.reduce((total, item) => {
    return total + (item.adminChargeAmount || 0);
  }, 0);

  console.log(totalAdminAmount);

  const totalLandlord = landlordData?.length;
  const totalTenant = tenantData?.length;
  const totalProperties = approvedProperties?.length;

  // console.log("Landlords:", totalLandlord);
  // console.log("tenantData:", totalTenant);
  console.log("totalProperties", totalProperties);

  if (isLoading || propertyLoading || loadingRevenue) {
    return <p>Loading...</p>;
  }

  if (isError || isErrorProperty || revenueError) {
    return <p>Error loading data</p>;
  }

  // const userData = allUsers?.data;
  // console.log(userData);

  // console.log(allCustomer?.data);

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, userName: data?.userName });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleBlock = (data) => {
    console.log("Blocked User:", { id: data?.id, userName: data?.userName });
    setIsViewModalVisible(false);
  };

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2">
      <div>
        <div>
          {/* Card Items */}
          <div className="flex items-center gap-5 mt-8 w-full">
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#222021] border border-[#808080] py-2 px-1 lg:p-5 items-center flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3 w-fit">
                  <img
                    src={AllIcons.groupsPerson}
                    className="h-10 w-10"
                    alt=""
                  />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-2xl text-primary-color mb-1">
                    Total Tenant
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {totalTenant}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#222021] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  {/* <img src={AllIcons.person} className="h-10 w-10" alt="" /> */}
                  <FaHouseChimneyUser className="h-8 w-8 text-primary-color" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Landlord
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {totalLandlord}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#222021] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  {/* <img src={AllIcons.person} className="h-10 w-10" alt="" /> */}
                  <LiaHandHoldingUsdSolid className="h-10 w-10 text-primary-color font-extrabold" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Revenue
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    ${totalAdminAmount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#222021] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  {/* <img src={AllIcons.person} className="h-10 w-10" alt="" /> */}
                  <FaLandmark className="h-8 w-8 text-primary-color" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Verified Properties
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {totalProperties}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* graphs */}
          <div className="mt-8 w-full">
            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-[#222021]"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Revenue</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      onChange={(value) => setSelectedYear(value)}
                      defaultValue="2025"
                      options={[
                        { value: "2025", label: "2025" },
                        { value: "2024", label: "2024" },
                        { value: "2023", label: "2023" },
                        { value: "2022", label: "2022" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <IncomeBarChart selectedYear={selectedYear} />
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 items-start lg:grid-cols-2 gap-5 mt-8 w-full">
            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      onChange={(value) => setSelectedDays(value)}
                      defaultValue="Last 7 days"
                      options={[{ value: "7day", label: "Last 7 days" }]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <Area_Chart selectedDays={selectedDays} />
              </div>
            </div>

            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      defaultValue="Last 24 Hours"
                      onChange={(value) => setSelectedHour(value)}
                      options={[
                        { value: "24hour", label: "Last 24 Hours" },
                        // { value: "12hour", label: "Last 12 Hours" },
                        // { value: "6hour", label: "Last 6 Hours" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <HourArea_Chart selectedHour={selectedHour} />
              </div>
            </div>
          </div> */}

          <div className="flex flex-col lg:flex-row gap-4 mt-5">
            <div className="bg-[#FFFFFF] rounded flex-1 p-3">
              <div className="flex justify-between items-center mx-3 py-2">
                <p className="text-2xl font-semibold text-base-color">
                  Property List
                </p>
                <div>
                  <Link to="/properties">
                    <p className="bg-[#2e2e2e] border border-secondary-color font-semibold text-white px-3 py-1 rounded-lg">
                      See All
                    </p>
                  </Link>
                </div>
              </div>
              <PropertyTable
                data={properties}
                showViewModal={showViewModal}
                showDeleteModal={showDeleteModal}
                pageSize={5}
              />
            </div>
          </div>
        </div>
        <ViewUserModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
        <DeleteUserModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default Dashboard;
