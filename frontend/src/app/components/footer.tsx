import { FOOTER_LINKS } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 border-t border-white/10 backdrop-blur-sm bg-black/20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-white/90">
          Made with ❤️ by{" "}
          <a
            href={FOOTER_LINKS[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            PopcornPicks
          </a>
        </p>
        <p className="text-sm text-white/70">
          <a
            href={FOOTER_LINKS[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            MIT License Copyright (c) 2024 PopcornPicks
          </a>
        </p>
      </div>
    </footer>
  );
}
