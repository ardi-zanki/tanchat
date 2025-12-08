import { createFileRoute, Outlet } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { AppSidebar } from "@/components/app-sidebar";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const loader = createServerFn().handler(() => {
  const sidebarState = getCookie("sidebar_state");
  return { sidebarState };
});

export const Route = createFileRoute("/(chat)")({
  component: Layout,
  loader: () => loader(),
});

function Layout() {
  const { sidebarState } = Route.useLoaderData();
  const isCollapsed = sidebarState !== "true";

  return (
    <DataStreamProvider>
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </DataStreamProvider>
  );
}
