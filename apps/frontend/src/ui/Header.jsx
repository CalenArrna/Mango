import Button from "./Button";

function Header() {
  return (
    <header className="p-2 bg-orange-200 flex justify-between align-center">
      <h1 className="uppercase text-orange-700 cursor-pointer">🥭 Mango</h1>
      <div className="flex gap-4">
        <Button>Login</Button>
        <Button type="secondary">Register</Button>
      </div>
    </header>
  );
}

export default Header;
