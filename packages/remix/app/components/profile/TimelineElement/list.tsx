import React from "react";
import Element from "./element";

export default function list({ elements }: any) {
  return elements.map((element: any, index: number) => {
    return <Element element={element} key={index} />;
  });
}
