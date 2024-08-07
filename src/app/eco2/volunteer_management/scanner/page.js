"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { createPortal } from "react-dom";
import QrReader from "react-camera-qr";

export default function QRScanner() {
  const router = useRouter();
  const [errorText, setErrorText] = useState("");
  const [qrData, setQrData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(false);
    router.back();
  };

  const handleClickClose = () => {
    setModalOpen(false);
    setQrData("");
  };

  const handleScan = (data) => {
    if (data) {
      
        setQrData(data)
      
    }
  };

  const handleError = (err) => {
    setErrorText(err);
  };

  // console.log("qrdata =====>", qrData);
  useEffect(() => {
    if (qrData != "") {
      // onOpen();
      setModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData]);
  return (
    <div>
      {/* <p>Hello World</p> */}
      {modalOpen &&
        createPortal(
          <Modal
            closeModal={handleClickClose}
            onSubmit={handleButtonClick}
            onCancel={handleButtonClick}
          >
            <p>{qrData}</p>
          </Modal>,
          document.body
        )}
      <QrReader
        delay={300}
        onError={(data) => handleError(data)}
        onScan={(data) => handleScan(data)}
        style={{ width: "100%", zIndex: 0 }}
      />
      {/* <QrReader
        onResult={(result, error) => {
          if (!!result) {
            // console.log("result ====>", result);
            setQrData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
        // open the front camera
        constraints={{ facingMode: "environment" }}
        videoStyle={{
          width: "100%",
          height: "100%",
          marginTop: isMobile ? -50 : -150,
        }}
      /> */}
    </div>
  );
}
