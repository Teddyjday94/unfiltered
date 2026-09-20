import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, viewBox = "0 0 24 24", ...props }: IconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M5 12H19" /><path d="M12 5L19 12L12 19" /></BaseIcon>;
}

export function ArrowDownIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M12 5V19" /><path d="M5 12L12 19L19 12" /></BaseIcon>;
}

export function ArrowUpRightIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M7 17L17 7" /><path d="M9 7H17V15" /></BaseIcon>;
}

export function ArrowDownRightIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M7 7L17 17" /><path d="M9 17H17V9" /></BaseIcon>;
}

export function ArrowLeftRightIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M3 12H21" /><path d="M8 7L3 12L8 17" /><path d="M16 7L21 12L16 17" /></BaseIcon>;
}

export function CloseIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M6 6L18 18" /><path d="M18 6L6 18" /></BaseIcon>;
}
