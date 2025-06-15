import Logo from "./logo";

export default function NavbarSimple({}) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </div>
    </header>
  );
}
