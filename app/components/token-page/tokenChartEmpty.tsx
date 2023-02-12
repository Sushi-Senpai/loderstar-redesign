import { useState } from "react";
import { useParams } from "@remix-run/react";
import TokenTopDetailsEmpty from "./tokenTopDetailsEmpty";

function TokenChartEmpty() {
  const [tabName, setTabName] = useState<string>("supply");
  const params = useParams();

  return (
    <div className="switch__to__network bg-[#141829] panel-custom mb-[60px] md:mb-[60px]">
      <div className="px-[15px] mb-[30px] md:mb-[26px] py-[17px] md:py-[20px] border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] leading-[22px] font-semibold text-base md:text-lg font-nova">
        <div className="animate w-[130px] h-[22px] md:h-[28px]"></div>
      </div>
      <TokenTopDetailsEmpty />
      <div className="mt-[33px] flex font-[SpaceGrotesk] uppercase font-bold text-xs leading-5 border-b border-[#282C2B] md:text-[15px] md:leading-[25.5px]">
        <div
          onClick={() => setTabName("supply")}
          className={`cursor-pointer text-center w-full pb-[6px] md:pb-[12px] border-b-[3px] md:w-[170px] ${
            tabName === "supply"
              ? "border-[#E5D540] text-[#E5D540]"
              : "border-[transparent] text-white"
          }`}
        >
          supply
        </div>
        {params.tokenId?.toUpperCase() !== "GLP" && (
          <div
            onClick={() => setTabName("borrow")}
            className={`cursor-pointer text-center w-full pb-[6px] md:pb-[12px] border-b-[3px] md:w-[170px] ${
              tabName === "borrow"
                ? "border-[#E69E40] text-[#E69E40]"
                : "border-[transparent] text-white"
            }`}
          >
            borrow
          </div>
        )}
      </div>
      <div className="p-[30px]">
        <div className="animate w-full h-[203px]"></div>
      </div>
    </div>
  );
}

export default TokenChartEmpty;
