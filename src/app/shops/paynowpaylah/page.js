"use client";
import { image } from "@/app/assets";
import { generatePayNowQR } from "@/app/components/GeneratePayNowQR";
import ShopNavBar from "@/app/components/ShopNavBar";
import { color } from "@/app/components/color";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function PaynowPaylah() {
  const [qrImage, setQrImage] = useState("");
  useEffect(() => {
    generatePayNowQR("4.00", setQrImage);
  }, []);
  console.log("qrImage ====>", qrImage);
  return (
    <div>
      <ShopNavBar name="Payment" />
      <h4 style={{ marginLeft: "10%", marginTop: 30 }}>PayNow / PayLah</h4>
      <div className="d-flex flex-column align-items-center col-11 col-md-6 mx-auto">
        <Image alt="" src={qrImage} width={300} height={300} />
        <p style={{ fontWeight: "bold", marginTop: 20 }}>SGD 4</p>
        <p style={{ fontSize: 10, color: color.grey }}>
          Enter your billing reference number inside the form on the left and
        </p>
        <p style={{ fontSize: 10, color: color.grey, marginTop: -15 }}>
          enter the bill reference number at your bank internet banking page
        </p>
        <p
          style={{
            cursor: "pointer",
            fontSize: 10,
            color: color.skyBlue,
            marginTop: -5,
          }}
        >
          Where to enter the bill reference number for my preferred banks
          internet banking page?
        </p>
        <p style={{ fontSize: 12, color: color.grey, marginTop: 0 }}>
          Click next and Pay
        </p>
        <Image
          alt=""
          src={image.banks}
          width={250}
          height={25}
          style={{ marginTop: -10 }}
        />
        <p style={{ fontSize: 10, color: color.grey }}>
          Please remember to enter the bill reference number,
        </p>
        <p style={{ fontSize: 10, color: color.grey, marginTop: -15 }}>
          so we will know it&apos;s you and can start processing your order
          Thank you!
        </p>
        <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              width: "70%"
            }}
            onClick={() => {}}
          >
            Done
          </button>
      </div>
    </div>
  );
}