import type { occupationType } from "~/api/strapi";
import Element from "./element";

type listProps = {
  elements: occupationType[];
};

export default function list({ elements }: listProps) {
  return (
    <>
      {elements.map((element, index: number) => {
        return <Element element={element} key={index} />;
      })}
    </>
  );
}
