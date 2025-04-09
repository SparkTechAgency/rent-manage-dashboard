import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  ConfigProvider,
  Form,
  Input,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Sample data for properties (you can replace this with real data)
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

const handleEdit = (record) => {
  console.log("Edit property:", record);
  // Handle edit logic, you can open a modal or navigate to an edit page
};

// State for managing the deletion modal visibility
const PropertyComponent = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteKey, setDeleteKey] = useState(null);
  const [data, setData] = useState(propertyData);

  const [form] = Form.useForm();

  // Handle table pagination changes
  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  // Show the delete confirmation modal
  const handleDelete = (key) => {
    setDeleteKey(key);
    setIsDeleteModalVisible(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    console.log("Deleted property with key:", deleteKey);

    setIsDeleteModalVisible(false);
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

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

  // Columns definition for the Ant Design Table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "Available") {
          color = "green";
        } else if (status === "Rented") {
          color = "geekblue";
        } else {
          color = "volcano";
        }
        return (
          <Tag className="h-7 text-base" color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)} // Trigger delete confirmation
          />
        </Space>
      ),
    },
  ];

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
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: data.length,
            showTotal: (total) => `Total ${total} items`,
          }}
          onChange={handleTableChange}
        />

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
              // style={{ height: 40, marginBottom: 20 }}
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

        {/* Confirmation Modal for Deleting */}
        <Modal
          title="Confirm Deletion"
          visible={isDeleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this property?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default PropertyComponent;
