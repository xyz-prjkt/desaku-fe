import { ContentPaper } from "@/components/atoms/paper";
import { Tabs } from "antd";
import SKApproverTable from "../components/SKApproverTable";
import { useGetSKApproverSettings } from "@/services/sk-approver-settings.service";
import FileApprovalDraggable from "../components/SKAppoverForm";

const SKApprovalFlowPage = () => {
  const { data: skApproverSettings, isLoading: skApproverSettingsIsLoading } =
    useGetSKApproverSettings();
  const onEditApprover = (id: string) => {
    console.log("Edit approver with ID:", id);
  };

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
              />
            ),
          },
        ]}
      />
    </ContentPaper>
  );
};

export default SKApprovalFlowPage;
