export default function Footer() {
  interface Link {
    label: string;
    url: string;
    ico: string;
  }
  let links: Link[] = [
    {
      label: "Docs",
      url: "https://docs.lodestarfinance.io",
      ico: "/images/ico/list.svg",
    },
    {
      label: "GitHub",
      url: "https://github.com/tender-finance/front-end",
      ico: "/images/ico/git.svg",
    },
    {
      label: "Support",
      ico: "/images/ico/email.svg",
      url: "mailto:dev@lodestarfinance.io",
    },
    {
      label: "Telegram",
      url: "https://t.me/lodestarfinancearb",
      ico: "/images/ico/telegram.svg",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/LodestarFinance",
      ico: "/images/ico/twitter.svg",
    },
    {
      label: "Discord",
      url: "https://t.co/2yYHcE44LZ",
      ico: "/images/ico/discord.svg",
    },
  ];
  return (
    <footer className="border-t border-[#2B2B2B] w-full">
      <div className="h-[120px] md:h-[62px] c flex-col-reverse items-center md:flex-row justify-between w-full flex max-w-[1400px]">
        <div className="mb-[30px] md:mb-0 font-normal text-base text-[#818987]">
          © {new Date().getFullYear()} Lodestar Finance
        </div>
        <div className="pt-[30px] flex gap-[20px] md:flex md:py-4 justify-center items-center">
          {links.map((item) => {
            return (
              <a
                aria-label={item.label}
                href={item.url}
                key={item.label}
                target="_self"
                rel="noreferrer"
              >
                <img
                  aria-hidden={true}
                  className="icons-color w-[20px] h-[20px] md:w-[20px] md:h-[20px]"
                  src={item.ico}
                  alt={item.label}
                />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
