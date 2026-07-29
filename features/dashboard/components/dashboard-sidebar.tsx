import Link from "next/link";
import {
  BookOpen,
  Settings,
  Sparkles,
} from "lucide-react";

const navigation = [
  {
    name: "Notebooks",
    href: "/notebooks",
    icon: BookOpen,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];


export function DashboardSidebar() {

  return (
    <aside
      className="
        fixed
        left-0
        overflow-y-auto
        hidden
        h-[calc(100vh-4rem)]
        w-64
        border-r
        border-border/70
        bg-background
        lg:block
      "
    >

      <div
        className="
          flex
          h-full
          flex-col
          px-4
          py-6
        "
      >

        {/* Navigation */}

        <nav
          className="
            space-y-1
          "
        >

          {navigation.map((item) => {

            const Icon = item.icon;


            return (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-all

                  hover:bg-primary/5
                  hover:text-foreground
                "
              >

                <Icon
                  className="
                    h-5
                    w-5
                    transition-colors
                    group-hover:text-primary
                  "
                />

                {item.name}

              </Link>
            );

          })}

        </nav>



        {/* Bottom Card */}

        <div
          className="
            mt-auto
            overflow-hidden
            rounded-2xl
            border
            border-border/70
            bg-card
            p-4
          "
        >

          <div
            className="
              mb-3
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
          >
            <Sparkles className="h-4 w-4" />
          </div>


          <p
            className="
              text-sm
              font-semibold
            "
          >
            VeriQ AI
          </p>


          <p
            className="
              mt-1
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Chat with your documents
            using your personal
            knowledge base.
          </p>


        </div>


      </div>


    </aside>
  );
}