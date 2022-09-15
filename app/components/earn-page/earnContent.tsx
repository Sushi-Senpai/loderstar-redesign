import { useState, useEffect } from "react";
import { hooks, metaMask } from "~/connectors/meta-mask";
import useAuth from "~/hooks/use-auth";

export default function EarnContent() {
  const { useIsActive } = hooks;

  const { connect, isDisconnected } = useAuth();
  const isActive = useIsActive();

  const [onClient, setOnClient] = useState<boolean>(false);

  useEffect(() => {
    setOnClient(true);
    if (!isDisconnected()) {
      void metaMask.connectEagerly();
    }
  }, [isDisconnected]);

  return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px] font-nova">
      <div className="max-w-[820px] my-o mx-auto">
        <p className="font-space text-[30px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Earn
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 mb-[31px] text-[#ADB5B3]">
          Stake TND to earn rewards. <br />
          Please read the{" "}
          <a
            className="line-solid cursor-pointer text-white"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives"
            target="_blank"
            rel="noreferrer"
          >
            staking details
          </a>{" "}
          to learn more.
          <br />
          You are earning TND rewards with 20.13 tokens.
          <br />
          Tokens: 0.21 TND, 56.43 esTND, 15.93 MP.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div className="panel-custom">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              TND
            </div>
            <div className="px-[15px] pt-[20px] pb-[16.9px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Price
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    $20.16
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">
                              Price on Arbitrum:
                            </span>
                            <span>$43.63</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987]">
                              Price on Avalanche:
                            </span>
                            <span>$43.98</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Wallet
                  </span>
                  <span className="flex flex-wrap w-fit text-xs leading-[17px]">
                    0.00 TND ($0.00)
                  </span>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked
                  </span>
                  <span className="flex flex-wrap w-fit text-xs leading-[17px]">
                    0.00 TND ($0.00)
                  </span>
                </div>
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[18.5px] md:pt-[23px] pb-[20px] md:pb-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">APR</span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span>20.16%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">esTND APR</span>
                            <span>15.18%</span>
                          </div>
                          <div className="flex justify-between items-center mb-[12px]">
                            <span className="text-[#818987]">TND APR</span>
                            <span>5.58%</span>
                          </div>
                          <p className="text-[#818987] text-left">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Rewards
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    $0.00
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">TND</span>
                            <span className="">0.00 ($0.00)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987]">esTND</span>
                            <span className="">0.00 ($0.00)</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Multiplier Points APR
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    100.00%
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Boost Percentage
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    0.00%
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-[#818987] text-start">
                          You are earning 0.00% more TND rewards using 0.00
                          Staked Multiplier Points. <br />
                          <br />
                          Use the "Compound" button to stake your Multiplier
                          Points.
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[19px] md:pt-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Staked
                  </span>
                  <div className="flex items-center line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    6,812,217 TND ($252,353,723)
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">Arbitrum:</span>
                            <span>6,479,541 TND</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987] ">Avalanche:</span>
                            <span>428,686 TND</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Supply
                  </span>
                  <span className="flex flex-wrap w-fit text-xs leading-[17px]">
                    6,812,217 TND ($252,353,723)
                  </span>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        Buy TND
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        STAKE
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        unStake
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Transfer account
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="panel-custom mt-[31px]">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              esTND
            </div>
            <div className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[19px] md:pb-[23px] ">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Price
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span>$20.16</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              Price on Arbitrum:
                            </span>
                            <div className="text-xs leading-[17px]">$43.63</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              Price on Avalanche:
                            </span>
                            <div className="text-xs leading-[17px]">$43.98</div>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Wallet
                  </span>
                  <div className="flex flex-wrap text-xs leading-[17px]">
                    0.00 TND ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked
                  </span>
                  <div className="flex flex-wrap  text-xs leading-[17px]">
                    0.00 TND ($0.00)
                  </div>
                </div>
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[13px] pb-[20px] md:pt-[24px] md:pb-[23px] ">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">APR</span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span>20.16%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              esTND APR
                            </span>
                            <div className="text-xs leading-[17px]">
                              <span>15.18%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-[12px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              TND APR
                            </span>
                            <div className="text-xs leading-[17px]">
                              <span>5.58%</span>
                            </div>
                          </div>
                          <p className="text-[#818987] text-xs  text-left leading-[17px]">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Multiplier Points APR
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span>100.00%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[20px] md:pt-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Staked
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-xs leading-[17px]">
                    1,472,862 TND ($54,630,107)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Supply
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-xs leading-[17px]">
                    2,254,142 TND ($83,608,654)
                  </div>
                </div>
              </div>

              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        STAKE
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        unStake
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="panel-custom mt-[32px]">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] pb-[18px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Supply and Borrow
            </div>
            <div className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[23px] ">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">APR</span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span>20.16</span>
                    <span>%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              esTND APR
                            </span>
                            <div className="text-xs leading-[17px]">
                              <span>15.18%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-[12px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              TND APR
                            </span>
                            <div className="text-xs leading-[17px]">
                              <span>5.58</span>
                              <span>%</span>
                            </div>
                          </div>
                          <p className="text-[#818987] text-xs  text-left leading-[17px]">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Rewards
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-xs leading-[17px]">
                    $0.00
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[20px] md:pt-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Your Staked
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px] text-right w-fit text-xs leading-[17px]">
                    1,472,862 TND ($54,630,107)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Your Supply
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-xs leading-[17px]">
                    2,254,142 TND ($83,608,654)
                  </div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[32px] gap-[12px] gap-y-[13px] md:gap-x-[17px]">
                <div className="btn-custom-border rounded-[6px]">
                  <button
                    onClick={() => window.open("/", "_blank")}
                    className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]"
                  >
                    Dashboard
                  </button>
                </div>
                <div
                  onClick={() => window.open("/markets/", "_blank")}
                  className="btn-custom-border rounded-[6px]"
                >
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                    Markets
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-custom mt-[32px]">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] pb-[18px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Total Rewards
            </div>
            <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] ">TND</span>
                  <div className="flex text-xs leading-[17px]">
                    0.00 ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    esTND
                  </span>
                  <div className="flex text-xs leading-[17px]">
                    0.00 ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Multiplier Points
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span>0.000</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked Multiplier Points
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span>0.000%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total
                  </span>
                  <div className="text-xs leading-[17px]">$0.00</div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Compound
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Claim
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-space text-[30px] mt-[61px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Vest
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 mb-[31px] text-[#ADB5B3]">
          Convert esTND tokens to TND tokens. Please read the{" "}
          <a
            className="cursor-pointer line-solid text-white"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives#vesting"
            target="_blank"
            rel="noreferrer"
          >
            vesting details
          </a>{" "}
          before using the vault.
        </p>
        <div className="font-[ProximaNova] w-full" id="vest">
          <div className="panel-custom">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              TND Vault
            </div>
            <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked Tokens
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span>0</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[8px]">
                            <span className="text-xs leading-[17px]">
                              0 TND
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-[8px]">
                            <span className="text-xs leading-[17px]">
                              0 TND
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs leading-[17px]">
                              0 Multiplier Points
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Reserved for Vesting
                  </span>
                  <div className="flex flex-wrap text-right w-fit text-xs leading-[17px]">
                    0
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Vesting Status
                  </span>
                  <div className="flex flex-wrap group cursor-pointer line-dashed text-right w-fit text-xs leading-[17px]">
                    <span>0</span>/<span>0</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-xs text-left leading-[17px]">
                            0 tokens have been converted to TND from the 0 esTND
                            deposited for vesting.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Claimable
                  </span>
                  <div className="flex flex-wrap group cursor-pointer group  line-dashed text-right w-fit text-xs leading-[17px]">
                    <span>0</span>/<span>0</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-xs text-left leading-[17px]">
                            0 TND tokens can be claimed, use the options under
                            the Total Rewards section to claim them.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Deposit
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Withdraw
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}