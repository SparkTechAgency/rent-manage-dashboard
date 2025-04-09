import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
// import {
//   useGetSettingsQuery,
//   useUpdateSettingsMutation,
// } from "../../../Redux/api/settingsApi";
// import { toast } from "sonner";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //   const {
  //     data: getSettingsData,
  //     isLoading: isFetching,
  //     error: fetchError,
  //     refetch,
  //   } = useGetSettingsQuery();
  //   console.log(getSettingsData?.data?.privacyPolicy);

  //   const [updateSettings, { isLoading: isUpdating }] =
  //     useUpdateSettingsMutation();

  //   useEffect(() => {
  //     if (getSettingsData?.data.privacyPolicy) {
  //       setContent(getSettingsData.data.privacyPolicy);
  //     }
  //   }, [getSettingsData]);

  const handleOnSave = async () => {
    // try {
    //   await updateSettings({ privacyPolicy: content }).unwrap();
    //   toast.success("privacyPolicy updated successfully!");
    //   // if
    //   // (getSettingsData?.data.privacyPolicy) { }
    //   //  else {
    //   //   // Add a new privacyPolicy if not existing
    //   //   await addSettings({ privacyPolicy: content }).unwrap();
    //   //   toast.success("privacyPolicy added successfully!");
    //   // }
    //   refetch(); // Refresh the data after save
    // } catch (error) {
    //   toast.error("Failed to save privacyPolicy. Please try again.");
    //   console.error("Save error:", error);
    // }
  };

  //   if (isFetching) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         <Spin size="large" tip="Loading privacyPolicy..." />
  //       </div>
  //     );
  //   }

  // Show error message if fetch fails
  //   if (fetchError) {
  //     return (
  //       <div className="text-white">
  //         Error loading privacyPolicy. Please try again later.
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-gray-100 py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-[#222021]">
          Privacy Policy
        </h1>
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          //   loading={isUpdating}
          className="w-full py-6 border !border-[#222021] hover:border-[#222021] text-xl !text-primary-color bg-[#222021] hover:!bg-[#222021] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
