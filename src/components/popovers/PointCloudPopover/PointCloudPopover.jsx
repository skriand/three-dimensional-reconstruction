import {
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import { CheckmarkRegular } from "@fluentui/react-icons";
import { PointCloudVisualiser } from "point-cloud-visualiser";
import { useStyles } from "./PointCloudPopover.styles";

export const PointCloudPopover = (open, handleOpenChange, length, points) => {
  const classes = useStyles();

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger disableButtonEnhancement>
        <Button
          icon={<CheckmarkRegular />}
          disabled={length < 2}
          size="large"
          appearance="outline"
        ></Button>
      </PopoverTrigger>

      <PopoverSurface
        tabIndex={-1}
        style={{
          width: 150,
          /*translate:
      orientation.type === "landscape-primary"
        ? "-160px 32px"
        : "0 -80px",*/
        }}
        className={classes.popover}
      >
        <PointCloudVisualiser
          points={points}
          //numberOfPoints={100000}
          pointColour={"#33E3FF"}
          //cameraPosition={[3, 3, 3]}
        />
      </PopoverSurface>
    </Popover>
  );
};
