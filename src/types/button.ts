export interface IButton {
  variant?: "primary" | "success" | "danger" | "warning" | "white";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
