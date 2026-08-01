import type { FC, ReactNode } from "react";
import { areaInfo, areaInfoWrapper, infoContent } from "./area-info.css";

export interface AreaInfoProps {
  topContent?: ReactNode;
  bottomContent?: ReactNode;
}

export const AreaInfo: FC<AreaInfoProps> = ({ topContent, bottomContent }) => {
  return (
    <div className={areaInfo}>
      <div className={areaInfoWrapper}>
        <div className={infoContent}>{topContent}</div>
        <div className={infoContent}>{bottomContent}</div>
      </div>
    </div>
  );
};
