import { Typography } from "@mui/material";
import { TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

type TitleProps = PropsWithChildren<TypographyProps>;

export function Title({ children, ...props }: TitleProps) {
  return (
    <Typography variant="h4" sx={{ mb: 4 }} {...props}>
      {children}
    </Typography>
  );
}
