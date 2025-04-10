import { useState } from "react";
import { Button, Modal, Form, Input, Select, ConfigProvider } from "antd";
import PropertyTable from "../Tables/PropertyTable";

const propertyData = [
  {
    key: "1",
    title: "Green Villa",
    location: "123 Green Street",
    owner: "John Doe",
    status: "Available",
  },
  {
    key: "2",
    title: "Sunny Apartment",
    location: "456 Sunny Lane",
    owner: "Jane Smith",
    status: "Rented",
  },
  {
    key: "3",
    title: "Cozy Cottage",
    location: "789 Cottage Ave",
    owner: "Alice Johnson",
    status: "Available",
  },
  {
    key: "4",
    title: "Luxury Mansion",
    location: "101 Luxury Blvd",
    owner: "Bob Brown",
    status: "Under Maintenance",
  },
  {
    key: "5",
    title: "Modern Condo",
    location: "202 Modern St",
    owner: "Charlie Davis",
    status: "Available",
  },
  {
    key: "6",
    title: "Beach House",
    location: "303 Beach Road",
    owner: "David Wilson",
    status: "Rented",
  },
  {
    key: "7",
    title: "Mountain Retreat",
    location: "404 Mountain Peak",
    owner: "Eve Parker",
    status: "Available",
  },
  {
    key: "8",
    title: "City Loft",
    location: "505 City Center",
    owner: "Frank Hall",
    status: "Rented",
  },
  {
    key: "9",
    title: "Suburban Ranch",
    location: "606 Suburb Lane",
    owner: "Grace Lee",
    status: "Under Maintenance",
  },
  {
    key: "10",
    title: "Downtown Penthouse",
    location: "707 Downtown Blvd",
    owner: "Harry King",
    status: "Available",
  },
];

const PropertyComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState(propertyData);

  const handleAddProperty = () => {
    setIsModalVisible(true);
  };

  const handleAddSubmit = (values) => {
    const newKey = (data.length + 1).toString(); // Simple key generation based on length
    const newProperty = {
      key: newKey,
      ...values,
    };
    setData([...data, newProperty]); // Add the new property to the state
    setIsModalVisible(false); // Close the modal after adding
    form.resetFields(); // Reset the form fields
  };

  const handleDelete = (key) => {
    setData(data.filter((item) => item.key !== key)); // Remove the property from state
  };

  const handleEdit = (record) => {
    console.log("Edit property:", record);
    // Handle edit logic, open a modal or navigate to an edit page
  };

  const [form] = Form.useForm();

  return (
    <div style={{ padding: "24px", background: "white" }}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(91,91,91)",
              headerColor: "rgba(255,255,255,0.88)",
            },
            Button: {
              colorPrimary: "rgb(91,91,91)",
              colorPrimaryHover: "rgb(118,118,118)",
              colorPrimaryActive: "rgb(62,62,62)",
            },
          },
        }}
      >
        <Button
          type="primary"
          style={{ marginBottom: 16, height: 40 }}
          onClick={handleAddProperty}
        >
          Add Property
        </Button>

        {/* Add Property Modal */}
        <Modal
          title="Add New Property"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          height={600}
          width={600}
        >
          <Form
            form={form}
            onFinish={handleAddSubmit}
            layout="vertical"
            initialValues={{ status: "Available" }}
          >
            <Form.Item
              name="title"
              label="Property Title"
              rules={[
                { required: true, message: "Please enter the property title!" },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please enter the location!" },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              name="owner"
              label="Owner"
              rules={[
                { required: true, message: "Please enter the owner's name!" },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select the property status!",
                },
              ]}
            >
              <Select className="h-10">
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="Rented">Rented</Select.Option>
                <Select.Option value="Under Maintenance">
                  Under Maintenance
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: 50 }}
              >
                Add Property
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      {/* Property Table */}
      <PropertyTable
        data={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
        pageSize={8}
      />
    </div>
  );
};

export default PropertyComponent;
