import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const TermsOfService = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log(getSettingsData?.data?.termsOfService);

  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load termsOfService data on component mount
  useEffect(() => {
    if (getSettingsData?.data.termsOfService) {
      setContent(getSettingsData.data.termsOfService);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      await updateSettings({ termsOfService: content }).unwrap();
      toast.success("termsOfService updated successfully!");
      // if
      // (getSettingsData?.data.termsOfService) { }
      //  else {
      //   // Add a new termsOfService if not existing
      //   await addSettings({ termsOfService: content }).unwrap();
      //   toast.success("termsOfService added successfully!");
      // }
      refetch(); // Refresh the data after save
    } catch (error) {
      toast.error("Failed to save termsOfService. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading termsOfService..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading termsOfService. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-color py-1 px-8 ">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-secondary-color">
          Terms Of Service
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
          loading={isUpdating}
          className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default TermsOfService;
