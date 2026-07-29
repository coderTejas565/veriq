import { DashboardNavbar } from "@/features/dashboard/components/dashboard-navbar";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-background">

      <DashboardNavbar />


      <div className="flex">

        <DashboardSidebar />


        <main
          className="
            flex-1
            lg:pl-64
          "
        >

          <div
            className="
              page-container
              py-8
            "
          >
            {children}
          </div>

        </main>


      </div>

    </div>
  );
}