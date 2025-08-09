import { ContentPaper } from "@/components/atoms/paper";
import { useGetSKApproverSettings } from "@/services/sk-approver-settings.service";
import { Button, Tabs } from "antd";
import { useState } from "react";
import FileApprovalDraggable from "../components/SKAppoverForm";
import { EditOutlined } from "@ant-design/icons";

const SKApprovalFlowPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data: skApproverSettings, isLoading: skApproverSettingsIsLoading } =
    useGetSKApproverSettings();

  return (
    <ContentPaper
      title="SK Approval Flow Management"
      isLoading={skApproverSettingsIsLoading}
    >
      <Tabs
        items={[
          {
            key: "KEMATIAN",
            label: "Kematian",
            children: (
              <FileApprovalDraggable
                skType="KEMATIAN"
                data={skApproverSettings?.data["KEMATIAN"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "TIDAK_MAMPU",
            label: "Tidak Mampu",
            children: (
              <FileApprovalDraggable
                skType="TIDAK_MAMPU"
                data={skApproverSettings?.data["TIDAK_MAMPU"]}
                isEditMode={isEdit}
              />
            ),
          },
        ]}
        tabBarExtraContent={{
          right: (
            <Button
              icon={<EditOutlined />}
              type={isEdit ? "primary" : "default"}
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? "Editing Mode" : "Edit Approval"}
            </Button>
          ),
        }}
      />
    </ContentPaper>
  );
};

export default SKApprovalFlowPage;
