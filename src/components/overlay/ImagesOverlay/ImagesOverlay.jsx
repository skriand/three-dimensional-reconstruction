import React from "react";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Button,
  Image,
} from "@fluentui/react-components";
import { Dismiss24Regular, ImageAdd24Regular } from "@fluentui/react-icons";
import { useStyles } from "./ImagesOverlay.styles";

export const ImagesOverlay = ({ isOpen, setIsOpen, imageFiles, getImage }) => {
  const styles = useStyles();

  return (
    <OverlayDrawer
      open={isOpen}
      onOpenChange={(_, { open }) => setIsOpen(open)}
      size="medium"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <>
              <Button
                size="large"
                aria-label="Add image"
                appearance="subtle"
                icon={<ImageAdd24Regular />}
                onClick={getImage}
              />
              <Button
                size="large"
                aria-label="Close panel"
                appearance="subtle"
                icon={<Dismiss24Regular />}
                onClick={() => setIsOpen(false)}
              />
            </>
          }
        >
          Captured images
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className="auto-grid">
        {imageFiles?.map((image) => {
          return (
            <Image
              width={"100%"}
              shape="rounded"
              src={URL.createObjectURL(image)}
            />
          );
        })}
      </DrawerBody>
    </OverlayDrawer>
  );
};
