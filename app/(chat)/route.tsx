import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeaders } from "@tanstack/react-start/server";
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "../(auth)/auth";

const loader = createServerFn().handler(async () => {
  const [session, sidebarState] = await Promise.all([
    auth.api.getSession({
      headers: getRequestHeaders(),
    }),
    getCookie("sidebar_state"),
  ]);

  return { session, sidebarState };
});

export const Route = createFileRoute("/(chat)")({
  component: Layout,
});

function Layout() {
  return (
    <DataStreamProvider>
      <Suspense fallback={<div className="flex h-dvh" />}>
        <SidebarWrapper>
          <Outlet />
        </SidebarWrapper>
      </Suspense>
    </DataStreamProvider>
  );
}

function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const loaderFn = useServerFn(loader);
  const {
    data: { session, sidebarState },
  } = useSuspenseQuery({
    queryKey: ["sidebar"],
    queryFn: () => loaderFn(),
  });

  const isCollapsed = sidebarState !== "true";

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
