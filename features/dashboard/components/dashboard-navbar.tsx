import Link from "next/link";
import { Brain, UserCircle } from "lucide-react";

export function DashboardNavbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-border/70
        bg-background/80
        backdrop-blur-xl
      "
    >

      <div
  className="
    flex
    h-16
    items-center
    justify-between
    px-6
    lg:px-8
  "
>

        {/* Brand */}

        <Link
          href="/notebooks"
          className="
            group
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
              transition
              group-hover:bg-primary/15
            "
          >
            <Brain className="h-5 w-5" />
          </div>


          <div
            className="
              hidden
              sm:block
            "
          >

            <p
              className="
                text-base
                font-semibold
                tracking-tight
              "
            >
              VeriQ
            </p>


            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              AI Knowledge Workspace
            </p>

          </div>


        </Link>



        {/* Account */}

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-border/70
            bg-card
            px-3
            py-2
            text-sm
            transition
            hover:bg-muted
          "
        >

          <UserCircle
            className="
              h-5
              w-5
              text-muted-foreground
            "
          />


          <span
            className="
              hidden
              sm:block
            "
          >
            Account
          </span>


        </button>


      </div>


    </header>
  );
}