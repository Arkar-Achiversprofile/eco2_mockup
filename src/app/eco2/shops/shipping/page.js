"use client";
import ShopNavBar from "../../../components/ShopNavBar";
import { color } from "../../../components/color";
import React, { useState } from "react";
import "./shipping.css";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function ShippingInfo() {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const [buttonIndex, setButtonIndex] = useState(1);
  const [collectionInstruction, setCollectionInstruction] = useState(false);

  const onClickPaymentType = (index) => {
    setButtonIndex(index);
  };

  const onClickCollectionInstruction = () => {
    setCollectionInstruction(!collectionInstruction);
  };

  return (
    <div>
      <ShopNavBar name="Shipping Info" />
      <div className="my-3">
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Name:</p>
            <p>Jerry Lim</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Display Name:</p>
            <p>Jerry</p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Mobile Phone:</p>
            <p>01234241</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Postal Code:</p>
            <p>54100</p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Unit Number:</p>
            <p>02</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Street:</p>
            <p>Serangoon avenue 5</p>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between border-bottom px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p>Zip:</p>
            <p>60607</p>
          </div>
          <div
            className="col-md-5 col-11 d-flex flex-row justify-content-between px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <p></p>
            <p></p>
          </div>
        </div>

        <h5
          style={{
            paddingLeft: isMobile ? 20 : 50,
            marginTop: 30,
            textDecoration: "underline",
          }}
        >
          Delivery Charges By Supplier
        </h5>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <p>Fish</p>
          <p>Fragrant Red Basil 60g</p>
          <div className="d-flex flex-row">
            <p style={{ width: isMobile ? "50%" : "30%", fontWeight: "bold" }}>
              Otolith Enrichment:
            </p>
            <p>SGD 10</p>
          </div>

          <p>The Food Kombucha Small Gift Pack (4 x 375ml)</p>
          <div className="d-flex flex-row">
            <p style={{ width: isMobile ? "50%" : "30%", fontWeight: "bold" }}>
              The Good Kombucha:
            </p>
            <p>SGD 12</p>
          </div>
        </div>
        <h5
          style={{
            paddingLeft: isMobile ? 20 : 50,
            marginTop: 30,
            textDecoration: "underline",
          }}
        >
          Self Collected
        </h5>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <p>Pearl Oyster Mushroom</p>
          <div className="d-flex flex-row">
            <p style={{ width: isMobile ? "50%" : "30%", fontWeight: "bold" }}>
              Mushroom Buddies:
            </p>
            <p>XXX, YYY (S) 123456</p>
          </div>
          {collectionInstruction ? (
            <div>
            <div
              style={{ cursor: 'pointer', textDecoration: 'underline', color: color.black }}
              onClick={() => onClickCollectionInstruction()}
            >
              Hide Collection Instruction
            </div>
            <p style={{color: color.red}}>Collection only be done on weekdays 9am-6pm</p>
            </div>
          ) : (
            <div
              style={{ cursor: 'pointer', textDecoration: 'underline', color: color.black }}
              onClick={() => onClickCollectionInstruction()}
            >
              Show Collection Instruction
            </div>
          )}
        </div>

        {/* <h5 style={{ paddingLeft: isMobile ? 20 : 50, marginTop: 30 }}>
          Delivery Information
        </h5>
        <div
          className="d-flex flex-row justify-content-around align-items-center mt-3"
          style={{ width: "80%", margin: "0 auto" }}
        >
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(0)}
            style={{
              cursor: "pointer",
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              backgroundColor: buttonIndex == 0 ? color.skyBlue : null,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 16,
                color: buttonIndex == 0 ? color.white : color.skyBlue,
              }}
            >
              Free
            </p>
            <p
              style={{
                fontSize: isMobile ? 8 : 10,
                color: buttonIndex == 0 ? color.white : color.black,
              }}
            >
              Self Collection
            </p>
          </div>
          <div
            style={{
              width: isMobile ? 20 : 50,
              height: 1,
              backgroundColor: color.grey,
            }}
          />
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(1)}
            style={{
              cursor: "pointer",
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              backgroundColor: buttonIndex == 1 ? color.skyBlue : null,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 16,
                color: buttonIndex == 1 ? color.white : color.skyBlue,
              }}
            >
              SGD 30
            </p>
            <p
              style={{
                fontSize: isMobile ? 8 : 10,
                color: buttonIndex == 1 ? color.white : color.black,
              }}
            >
              Delivery
            </p>
          </div>
          <div
            style={{
              width: isMobile ? 20 : 50,
              height: 1,
              backgroundColor: color.grey,
            }}
          />
          <div
            className="border border-info"
            onClick={() => onClickPaymentType(2)}
            style={{
              cursor: "pointer",
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              backgroundColor: buttonIndex == 2 ? color.skyBlue : null,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: isMobile ? 12 : 16,
                color: buttonIndex == 2 ? color.white : color.skyBlue,
              }}
            >
              Other
            </p>
            <p
              style={{
                fontSize: isMobile ? 8 : 10,
                color: buttonIndex == 2 ? color.white : color.black,
              }}
            >
              If any other option
            </p>
          </div>
        </div> */}

        <div className="d-flex flex-row justify-content-center mt-3">
          <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              padding: isMobile ? "5px 30px" : "5px 40px",
              marginRight: 20,
            }}
            onClick={() => router.back()}
          >
            Back
          </button>
          <button
            type="button"
            class="btn btn-info"
            style={{
              color: color.white,
              fontSize: 16,
              padding: isMobile ? "5px 30px" : "5px 40px",
            }}
            onClick={() => router.push("/eco2/shops/payment")}
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
}
