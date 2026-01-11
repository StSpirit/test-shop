import AppShell from "./components/AppShell";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-6xl py-12 px-6">
        <AppShell />
      </main>
    </div>
  );
}
