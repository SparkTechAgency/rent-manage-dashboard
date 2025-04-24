import { ConfigProvider } from "antd";
import PropertyTable from "../Tables/PropertyTable";
import { PropertyImages } from "../../../public/images/AllImages";

const propertyData = [
  {
    key: "1",
    title: "Green Villa",
    location: "123 Green Street",
    owner: "John Doe",
    status: "verify_request",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A beautiful villa surrounded by lush green gardens.",
    price: "$1,200,000",
    size: "3500 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "2",
    title: "Sunny Apartment",
    location: "456 Sunny Lane",
    owner: "Jane Smith",
    status: "verified",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A modern apartment with stunning city views.",
    price: "$850,000",
    size: "1500 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "3",
    title: "Cozy Cottage",
    location: "789 Cottage Ave",
    owner: "Alice Johnson",
    status: "verify_request",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A cozy cottage perfect for a quiet weekend getaway.",
    price: "$450,000",
    size: "1200 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "4",
    title: "Luxury Mansion",
    location: "101 Luxury Blvd",
    owner: "Bob Brown",
    status: "verified",
    image: [PropertyImages.property01, PropertyImages.property02],
    description:
      "A luxury mansion with all modern amenities and expansive space.",
    price: "$5,000,000",
    size: "8500 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "5",
    title: "Modern Condo",
    location: "202 Modern St",
    owner: "Charlie Davis",
    status: "verify_request",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A stylish condo located in the heart of the city.",
    price: "$1,000,000",
    size: "2000 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "6",
    title: "Beach House",
    location: "303 Beach Road",
    owner: "David Wilson",
    status: "verified",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A beautiful beach house with oceanfront views.",
    price: "$2,800,000",
    size: "4000 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "7",
    title: "Mountain Retreat",
    location: "404 Mountain Peak",
    owner: "Eve Parker",
    status: "verify_request",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A serene retreat located at the top of the mountain.",
    price: "$1,500,000",
    size: "3000 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "8",
    title: "City Loft",
    location: "505 City Center",
    owner: "Frank Hall",
    status: "verified",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A trendy city loft with open-plan living.",
    price: "$950,000",
    size: "1800 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "9",
    title: "Suburban Ranch",
    location: "606 Suburb Lane",
    owner: "Grace Lee",
    status: "verify_request",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "A large ranch with plenty of space for outdoor activities.",
    price: "$3,200,000",
    size: "6000 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
  {
    key: "10",
    title: "Downtown Penthouse",
    location: "707 Downtown Blvd",
    owner: "Harry King",
    status: "verified",
    image: [PropertyImages.property01, PropertyImages.property02],
    description: "An extravagant penthouse with panoramic city views.",
    price: "$4,500,000",
    size: "5000 sq ft",
    files: [PropertyImages.file01, PropertyImages.file02],
  },
];

const PropertyComponent = () => {
  // const [data, setData] = useState(propertyData);
  // const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [editingProperty, setEditingProperty] = useState(null);

  // const handleAddProperty = () => {
  //   setIsAddModalVisible(true);
  // };

  // const handleAddSubmit = (values) => {
  //   const newKey = (data.length + 1).toString();
  //   const newProperty = {
  //     key: newKey,
  //     ...values,
  //   };
  //   setData([...data, newProperty]);
  //   setIsAddModalVisible(false);
  //   form.resetFields();
  // };

  // const handleEditSubmit = (values) => {
  //   setData(
  //     data.map((item) =>
  //       item.key === editingProperty.key ? { ...item, ...values } : item
  //     )
  //   );
  //   setIsEditModalVisible(false);
  //   setEditingProperty(null);
  // };

  // const handleEdit = (record) => {
  //   console.log("Edit property:", record);
  //   setEditingProperty(record);
  //   setIsEditModalVisible(true);
  // };

  const showDetails = (record) => {
    console.log("View property details:", record);
  };

  // const handleDelete = (key) => {
  //   setData(data.filter((item) => item.key !== key));
  // };

  // const [form] = Form.useForm();

  return (
    <div className="h-screen p-6">
      <p className="text-3xl font-bold pb-5">Property List</p>
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
        {/* <Button
          type="primary"
          style={{ marginBottom: 16, height: 40 }}
          onClick={handleAddProperty}
        >
          Add Property
        </Button> */}

        {/* Add Property Modal */}
        {/* <Modal
          title="Add New Property"
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
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
        </Modal> */}

        {/* Edit Modal */}
        {/* <Modal
          title="Edit Property"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
        >
          <Form
            initialValues={editingProperty}
            onFinish={handleEditSubmit}
            layout="vertical"
          >
            <Form.Item name="title" label="Property Title">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="owner" label="Owner">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select className="h-10">
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="Rented">Rented</Select.Option>
                <Select.Option value="Under Maintenance">
                  Under Maintenance
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="h-10 w-full">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </ConfigProvider>

      {/* Property Table */}
      <PropertyTable
        data={propertyData}
        // onDelete={handleDelete}
        // onEdit={handleEdit}
        showDetails={showDetails}
        pageSize={8}
      />
    </div>
  );
};

export default PropertyComponent;
