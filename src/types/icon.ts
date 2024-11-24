import { SvgIconName } from "@/assets/icons/paths.svg";

export interface IICon {
  name: SvgIconName;
  size?: string | number;
  fill?: string;
  viewBox?: string;
  customClass?: string;
}
