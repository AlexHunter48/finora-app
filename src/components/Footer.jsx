export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F0E0D] px-6 py-16 text-gray-400">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <h2 className="mb-3 text-xl font-bold tracking-widest text-white">
              FINORA
            </h2>
            <p className="text-sm leading-relaxed">
              Track subscriptions, manage expenses, and never be caught off
              guard by unexpected renewals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                Product
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#how-it-works">How it works</a>
                </li>
                <li>
                  <a href="#">Pricing</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                Company
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                Legal
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">
            ©{new Date().getFullYear()} Finora. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
