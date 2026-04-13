import { MY_LINKS as links } from "@/data/links";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-5 border-t border-zinc-500 dark:border-zinc-600">

        {/* Social Links Row */}
        <div className="flex flex-col w-[50%] items-start gap-3">
            <div className="flex flex-wrap items-center gap-3 text-lg">
                {links.map((item) => (
                    <a
                        key={item.name}
                        title={item.name}
                        href={item.link}
                        aria-label={item.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-700 dark:text-zinc-400 hover:text-theme-primary-dark dark:hover:text-theme-primary-dark hover:scale-120 transition-all duration-500"
                    >
                        {item.icon}
                    </a>
                ))}
            </div>
        </div>

        {/* Copyright & Info Row */}
        <div className="w-[70%] flex flex-col sm:flex-row items-start sm:items-center mt-4 gap-y-2 sm:gap-y-0 sm:gap-x-3 text-xs text-zinc-700 dark:text-zinc-400 font-medium tracking-wide leading-none">
            <span>© {currentYear}</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700 dark:bg-zinc-400" aria-hidden="true" />
            <span>
                Made with ♡ by{" "}
                <span className="text-black dark:text-white drop-shadow-[0_0_5px_var(--color-theme-primary-dark)] dark:drop-shadow-[0_0_5px_var(--color-theme-primary-light)]">
                    melzarjanchico
                </span>
            </span>
        </div>

    </footer>
  );
};

export default Footer;
