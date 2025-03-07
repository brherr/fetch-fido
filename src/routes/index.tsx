import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click Me</Button>
      </div>
    </div>
  );
}
