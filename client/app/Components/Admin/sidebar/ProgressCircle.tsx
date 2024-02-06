import { Box, useTheme, Theme } from "@mui/material";
import { tokens } from "./theme";
import { ReactNode } from "react";

interface ProgressCircleProps {
  progress?: string;
  size?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress = "0.75",
  size = "40",
}) => {
  const theme = useTheme();
  const colors = tokens((theme as Theme).palette.mode);
  const angle = parseFloat(progress) * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
