import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {
  Button,
  Tab,
  TabList,
  Toolbar,
  Image,
  CounterBadge,
  Toast,
  ToastTitle,
  ToastTrigger,
  Link,
  useId,
  useToastController,
  Toaster,
  ToastFooter,
} from "@fluentui/react-components";
import { ImageAddRegular } from "@fluentui/react-icons";
import { useOrientation, useWindowSize } from "@uidotdev/usehooks";
import { ImagesOverlay } from "../../overlay/ImagesOverlay/ImagesOverlay";
import exifr from "exifr";
import { useStyles } from "./Camera.styles";
import { FeaturesToolbar } from "../../toolbars/FeaturesToolbar/FeaturesToolbar";
import { CaptureToolbar } from "../../toolbars/CaptureToolbar/CaptureToolbar";
import { PointCloudPopover } from "../../popovers/PointCloudPopover/PointCloudPopover";

const pickerOpts = {
  types: [
    {
      description: "Images",
      accept: {
        "image/*": [".jpeg"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

export const Camera = () => {
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: { exact: "environment" },
  });
  const classes = useStyles();
  const orientation = useOrientation();
  const size = useWindowSize();
  const webcamRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  useEffect(() => {
    if (imageFiles.length >= 2) setOpen(true);
    if (imageFiles.length)
      exifr.parse(imageFiles.at(-1)).then((output) => console.log(output));
  }, [imageFiles]);

  const handleOpenChange = (e, data) => setOpen(data.open || false);

  const capture = useCallback(() => {
    const imageCapture = new ImageCapture(
      webcamRef.current.stream.getVideoTracks()[0]
    );
    imageCapture.takePhoto().then((blob) => {
      const newFile = new File([blob], "MyJPEG.jpg", { type: "image/jpeg" });
      setImageFiles((imageFiles) => {
        return [...imageFiles, newFile];
      });
    });
  }, [webcamRef]);

  async function getImage() {
    try {
      const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
      const fileData = await fileHandle.getFile();
      setImageFiles((imageFiles) => {
        return [...imageFiles, fileData];
      });
    } catch (e) {
      console.error(e, e.stack);
    }
  }

  const handleClick = () => {
    if (videoConstraints.facingMode.exact === "user")
      setVideoConstraints({
        facingMode: { exact: "environment" },
      });
    else
      setVideoConstraints({
        facingMode: { exact: "user" },
      });
  };

  const notify = () => {
    dispatchToast(
      <Toast className={classes.toast}>
        <ToastTitle>Leftover images from last session</ToastTitle>
        <ToastFooter>
          <ToastTrigger>
            <Link>Dismiss</Link>
          </ToastTrigger>
          <ToastTrigger>
            <Link>Restore</Link>
          </ToastTrigger>
        </ToastFooter>
      </Toast>,
      { intent: "warning", timeout: -1, position: "bottom" }
    );
  };

  return (
    <div className={classes.root}>
      <Toaster toasterId={toasterId} />
      <FeaturesToolbar orientation={orientation} />
      <Webcam
        className={
          size.width > size.height
            ? classes.webCamLandscape
            : classes.webCamPortrait
        }
        mirrored={videoConstraints.facingMode.exact === "user"}
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <div
        className={
          orientation.type === "landscape-primary"
            ? classes.toolbarRight
            : classes.toolbarBottom
        }
      >
        <TabList
          vertical={orientation.type === "landscape-primary"}
          defaultSelectedValue="object"
          className={classes.tablist}
        >
          <Tab value="object">Object</Tab>
          <Tab value="area">Area</Tab>
        </TabList>

        <Toolbar
          aria-label="Large"
          size="large"
          vertical={orientation.type === "landscape-primary"}
          className={classes.toolbar}
        >
          {imageFiles?.length ? (
            <div className={classes.badgeDiv}>
              <Button
                size="large"
                aria-label="Captured images"
                className={classes.imageButton}
                onClick={() => setIsOpen(true)}
              >
                <Image
                  src={URL.createObjectURL(imageFiles.at(-1))}
                  fit="cover"
                />
              </Button>
              <CounterBadge
                className={classes.badge}
                count={imageFiles.length}
                appearance="filled"
              />
            </div>
          ) : (
            <Button
              size="large"
              appearance="outline"
              aria-label="Add image"
              onClick={() => setIsOpen(true)}
              icon={<ImageAddRegular />}
            ></Button>
          )}

          <CaptureToolbar capture={capture} handleClick={handleClick} />

          <PointCloudPopover
            open={open}
            handleOpenChange={handleOpenChange}
            length={imageFiles.length}
          />
        </Toolbar>
      </div>
      <ImagesOverlay
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        imageFiles={imageFiles}
        getImage={getImage}
      />
    </div>
  );
};
