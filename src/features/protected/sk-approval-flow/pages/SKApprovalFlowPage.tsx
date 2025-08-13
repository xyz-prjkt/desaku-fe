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
          {
            key: "DISPENSASI",
            label: "Dispensasi",
            children: (
              <FileApprovalDraggable
                skType="DISPENSASI"
                data={skApproverSettings?.data["DISPENSASI"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "BEDA_NAMA",
            label: "Beda Nama",
            children: (
              <FileApprovalDraggable
                skType="BEDA_NAMA"
                data={skApproverSettings?.data["BEDA_NAMA"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "DOMISILI",
            label: "Domisili",
            children: (
              <FileApprovalDraggable
                skType="DOMISILI"
                data={skApproverSettings?.data["DOMISILI"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "KEHILANGAN",
            label: "Kehilangan",
            children: (
              <FileApprovalDraggable
                skType="KEHILANGAN"
                data={skApproverSettings?.data["KEHILANGAN"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "KELAHIRAN",
            label: "Kelahiran",
            children: (
              <FileApprovalDraggable
                skType="KELAHIRAN"
                data={skApproverSettings?.data["KELAHIRAN"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "USAHA",
            label: "Usaha",
            children: (
              <FileApprovalDraggable
                skType="USAHA"
                data={skApproverSettings?.data["USAHA"]}
                isEditMode={isEdit}
              />
            ),
          },
          {
            key: "KTP_SEMENTARA",
            label: "KTP Sementara",
            children: (
              <FileApprovalDraggable
                skType="KTP_SEMENTARA"
                data={skApproverSettings?.data["KTP_SEMENTARA"]}
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
