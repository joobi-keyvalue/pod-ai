export interface TextInputPropType {
  icon?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  padding?: string;
  type?: string;
  fontSize?: string; 
  onClick?: () => void;
  onChange?: (val: string) => void
}