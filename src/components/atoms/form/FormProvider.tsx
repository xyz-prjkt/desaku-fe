import { ReactNode } from 'react';
import {
  FormProvider as BaseFormProvider,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

interface IFormProviderProps<TFieldValues extends FieldValues> {
  children: ReactNode;
  formMethods: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
}

const FormProvider = <TFieldValues extends FieldValues>({
  children,
  formMethods,
  onSubmit,
}: IFormProviderProps<TFieldValues>) => {
  return (
    <BaseFormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        noValidate
        className="w-full"
      >
        {children}
      </form>
    </BaseFormProvider>
  );
};

export default FormProvider;
