/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import DeleteUserModal from "../../UI/DeleteUserModal";
// import { useAllUsersQuery } from "../../../Redux/api/userApi";
import axios from "axios";
import TenantTable from "../../Tables/TenantTable";
import ViewUserModal from "../../UI/ViewUserModal";
import { useAllUsersQuery } from "../../../Redux/api/userApi";

export default function Landlord() {
  const {
    data: allUsers,
    isLoading: userLoading,
    isError,
    refetch,
  } = useAllUsersQuery();
  const users = allUsers?.data || [];
  console.log(users);

  const tenantData = users?.filter((user) => user.role === "tenant");
  console.log("Tenants:", tenantData);

  const [searchText, setSearchText] = useState("");
  const [isViewCustomer, setIsViewCustomer] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchText) return tenantData;
    return tenantData.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [tenantData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showCustomerViewModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsViewCustomer(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, data });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewCustomer(false);
    setIsDeleteModalVisible(false);
  };

  if (userLoading) {
    <p>Loading..</p>;
  }

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded">
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-secondary-color">
              Tenant List
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search Tenant..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold !border-[#222021] py-2"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            />
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <TenantTable
            data={filteredData}
            loading={loadingUser}
            showCustomerViewModal={showCustomerViewModal}
            showDeleteModal={showDeleteModal}
            pageSize={8}
          />
        </div>

        <ViewUserModal
          isViewCustomer={isViewCustomer}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          // handleBlock={handleBlock}
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
}
