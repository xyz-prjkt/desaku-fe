import { DraggablePortal } from "@/components/atoms/draggable";
import { FormProvider } from "@/components/atoms/form";
import { UserSelectInput } from "@/components/general/select/UserSelectInput";
import { useAnt } from "@/hooks";
import {
  ISKApproverSettings,
  ISKApproverSettingsBody,
} from "@/interfaces/services/sk-approver-settings";
import { SkType } from "@/interfaces/services/sk-type";
import { useUpdateSKApproverSettings } from "@/services/sk-approver-settings.service";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Divider, Space, Typography } from "antd";
import { useEffect, useRef } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";
import { skApprovalFlowSchema } from "../schemas/sk-approval-flow.schema";

const { Text } = Typography;

interface ISKApproverFormProps {
  skType: SkType;
  data: ISKApproverSettings[];
  isEditMode?: boolean;
  onSubmit?: (data: ISKApproverSettingsBody) => void;
}

const SKApproverForm = ({
  skType,
  data,
  isEditMode = false,
}: ISKApproverFormProps) => {
  const {
    mutateAsync: updateSKApprover,
    isPending: updateSKApproverIsPending,
  } = useUpdateSKApproverSettings();

  const { message } = useAnt();
  const isSubmittingRef = useRef(false);

  const formMethods = useForm<ISKApproverSettingsBody>({
    resolver: yupResolver(skApprovalFlowSchema),
    values: {
      sk_type: skType,
      approvers: data?.map((approver) => ({
        is_active: approver.is_active,
        order_priority: approver.order_priority,
        user_approver_id: approver.user_approver_id,
      })),
    },
  });

  const formValues = formMethods.watch();
  const {
    fields: approversFields,
    append: appendApprover,
    remove: removeApprover,
    move: moveApprover,
  } = useFieldArray({
    control: formMethods.control,
    name: "approvers",
  });

  useEffect(() => {
    if (!isEditMode) return;
    const subscription = formMethods.watch(async (value, { name, type }) => {
      if (
        type === "change" &&
        name?.startsWith("approvers") &&
        name.endsWith("user_approver_id") &&
        !isSubmittingRef.current
      ) {
        const fieldIndex = parseInt(name.split(".")[1]);
        const approverValue = value.approvers?.[fieldIndex];

        if (approverValue?.user_approver_id) {
          isSubmittingRef.current = true;
          try {
            await formMethods.handleSubmit(handleSubmit)();
          } finally {
            isSubmittingRef.current = false;
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isEditMode]);

  const onDragEnd = async (result: DropResult) => {
    if (!isEditMode) return;
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    moveApprover(source.index, destination.index);
    await formMethods.handleSubmit(handleSubmit)();
  };

  const handleRemoveApprover = async (index: number) => {
    removeApprover(index);
    if (isEditMode) await formMethods.handleSubmit(handleSubmit)();
  };

  const handleAddApprover = () => {
    appendApprover({
      user_approver_id: "",
      is_active: true,
      order_priority: approversFields.length + 1,
    });
  };

  const selectedApproverIds = (formValues.approvers || [])
    .map((a: any) => a?.user_approver_id)
    .filter(Boolean);

  const approversError = formMethods.formState.errors?.approvers;
  const hasApproversError = !!approversError;

  const handleSubmit = async (data: ISKApproverSettingsBody) => {
    if (!isEditMode) return;
    const submitData = {
      ...data,
      approvers: data.approvers.map((approver, index) => ({
        ...approver,
        order_priority: index + 1,
      })),
    };

    await updateSKApprover(submitData)
      .then((res) => {
        if (res.success) {
          message.success("Approver settings updated successfully");
        }
      })
      .catch((err) => message.error((err as Error).message));
  };

  return (
    <FormProvider formMethods={formMethods} onSubmit={handleSubmit}>
      <Card
        size="small"
        variant="outlined"
        className={`bg-slate-50 ${hasApproversError ? "border-red-500" : ""}`}
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      >
        <div className="text-xs mb-2">Document Approvers</div>
        {hasApproversError && typeof approversError?.message === "string" && (
          <Text type="danger" className="text-xs mt-2 block">
            {approversError.message}
          </Text>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="approvers" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full flex overflow-scroll pb-6"
              >
                {approversFields.map((field, index) => {
                  const currentId =
                    formValues.approvers?.[index]?.user_approver_id;
                  const disabledOptions = selectedApproverIds.filter(
                    (id: string) => id && id !== currentId
                  );

                  return (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index}
                      isDragDisabled={!isEditMode}
                    >
                      {(provided, snapshot) => {
                        const card = (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...(isEditMode ? provided.dragHandleProps : {})}
                            className="flex items-center"
                          >
                            <Card className="min-w-64">
                              <div className="text-xs mb-2">
                                Approver {index + 1}
                              </div>
                              <Space.Compact className="w-full">
                                <UserSelectInput
                                  name={`approvers.${index}.user_approver_id`}
                                  placeholder="Select Approver"
                                  fullWidth
                                  disabledOptions={disabledOptions}
                                  disabled={!isEditMode}
                                />
                                {isEditMode && (
                                  <Button
                                    className="w-fit"
                                    danger
                                    onClick={() => handleRemoveApprover(index)}
                                    loading={updateSKApproverIsPending}
                                  >
                                    <DeleteOutlined />
                                  </Button>
                                )}
                              </Space.Compact>
                            </Card>
                            {index < approversFields.length - 1 && (
                              <div className="w-10 h-full flex justify-center items-center">
                                <Divider type="horizontal" />
                              </div>
                            )}
                          </div>
                        );
                        return snapshot.isDragging ? (
                          <DraggablePortal>{card}</DraggablePortal>
                        ) : (
                          card
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isEditMode && (
          <Button
            icon={<UserAddOutlined />}
            className="w-full"
            type="dashed"
            onClick={handleAddApprover}
            disabled={updateSKApproverIsPending}
          >
            Add Approver
          </Button>
        )}
      </Card>
    </FormProvider>
  );
};

export default SKApproverForm;
