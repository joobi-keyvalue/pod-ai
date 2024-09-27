export interface TextInputPropType {
  icon?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  type?: string;
  onClick?: () => void;
  onChange?: (val: string) => void
}