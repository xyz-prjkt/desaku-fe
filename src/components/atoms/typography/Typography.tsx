import { Typography as BaseTypography } from 'antd';
import clsx from 'clsx';
import { ITypographyProps } from './interfaces';

const { Text, Title } = BaseTypography;

/**
 * Main Typography component.
 */
const Typography = () => {
  return null;
};

/**
 * Paragraph Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyP component.
 * @returns {JSX.Element} The rendered TypographyP component.
 */
const TypographyP = ({
  children,
  title,
  className,
  classNameTitle,
}: ITypographyProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && (
        <div className={clsx('font-medium', classNameTitle)}>{title}</div>
      )}
      <Text className={clsx(className)}>{children}</Text>
    </div>
  );
};

/**
 * H1 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH1 component.
 * @returns {JSX.Element} The rendered TypographyH1 component.
 */
const TypographyH1 = ({
  children,
  subtitle,
  className,
  classNameTitle,
}: ITypographyProps) => {
  return (
    <div className={clsx('flex flex-col mb-0')}>
      <Title level={1} className={clsx(subtitle && '!mb-0', classNameTitle)}>
        {children}
      </Title>
      <Text className={clsx(className)}>{subtitle}</Text>
    </div>
  );
};

/**
 * H2 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH2 component.
 * @returns {JSX.Element} The rendered TypographyH2 component.
 */
const TypographyH2 = ({
  children,
  subtitle,
  className,
  classNameTitle,
}: ITypographyProps) => {
  return (
    <div className={clsx('flex flex-col mb-0')}>
      <Title level={2} className={clsx(subtitle && '!mb-0', classNameTitle)}>
        {children}
      </Title>
      <Text className={clsx(className)}>{subtitle}</Text>
    </div>
  );
};

/**
 * H3 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH3 component.
 * @returns {JSX.Element} The rendered TypographyH3 component.
 */
const TypographyH3 = ({
  children,
  subtitle,
  className,
  classNameTitle,
}: ITypographyProps) => {
  return (
    <div className={clsx('flex flex-col mb-0')}>
      <Title level={3} className={clsx(subtitle && '!mb-0', classNameTitle)}>
        {children}
      </Title>
      <Text className={clsx(className)}>{subtitle}</Text>
    </div>
  );
};

/**
 * H4 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH4 component.
 * @returns {JSX.Element} The rendered TypographyH4 component.
 */
const TypographyH4 = ({
  children,
  subtitle,
  className,
  classNameTitle,
}: ITypographyProps) => {
  return (
    <div className={clsx('flex flex-col mb-0')}>
      <Title level={4} className={clsx(subtitle && '!mb-0', classNameTitle)}>
        {children}
      </Title>
      <Text className={clsx(className)}>{subtitle}</Text>
    </div>
  );
};

/**
 * H5 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH5 component.
 * @returns {JSX.Element} The rendered TypographyH5 component.
 */
const TypographyH5 = ({
  children,
  subtitle,
  className,
  classNameTitle,
}: ITypographyProps) => {
  return (
    <div className={clsx('flex flex-col mb-0')}>
      <Title level={5} className={clsx(subtitle && '!mb-0', classNameTitle)}>
        {children}
      </Title>
      <Text className={clsx(className)}>{subtitle}</Text>
    </div>
  );
};

Typography.P = TypographyP;
Typography.H1 = TypographyH1;
Typography.H2 = TypographyH2;
Typography.H3 = TypographyH3;
Typography.H4 = TypographyH4;
Typography.H5 = TypographyH5;

export default Typography;
