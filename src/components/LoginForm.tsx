import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useFidoStore } from "@/lib/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});

type LoginT = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginT>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();
  const navigate = useNavigate();
  const router = useRouter();
  const setUser = useFidoStore((state) => state.setUser);

  const onSubmit = (values: LoginT) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        const user = { ...values };
        setUser(user);
        router.update({ context: { user } });
        navigate({ to: "/" });
      },
      onError: (error) => {
        console.error("login failed", error);
        reset({
          name: "",
          email: "",
        });
      },
    });
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your name and email below to login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="name">Name</Label>
          </div>
          <Input
            id="name"
            type="name"
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="me@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm" data-testid="email-error">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </div>
    </form>
  );
}
