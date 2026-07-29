import {
  Settings,
  User,
  Shield,
} from "lucide-react";


export default function SettingsPage() {
  return (
    <main className="space-y-8">

      {/* Header */}

      <section
        className="
          rounded-3xl
          border
          bg-card
          p-8
          shadow-sm
        "
      >

        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <Settings className="h-6 w-6" />
          </div>


          <div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              Settings
            </h1>


            <p
              className="
                mt-2
                text-muted-foreground
              "
            >
              Manage your VeriQ workspace preferences.
            </p>

          </div>

        </div>

      </section>



      {/* Settings Cards */}

      <section
        className="
          grid
          gap-6
          md:grid-cols-2
        "
      >

        <div
          className="
            rounded-3xl
            border
            bg-card
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <User
              className="
                h-5
                w-5
                text-primary
              "
            />

            <h2 className="font-semibold">
              Account
            </h2>

          </div>


          <p
            className="
              mt-3
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            Manage your profile information
            and account preferences.
          </p>


        </div>



        <div
          className="
            rounded-3xl
            border
            bg-card
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Shield
              className="
                h-5
                w-5
                text-primary
              "
            />

            <h2 className="font-semibold">
              Security
            </h2>

          </div>


          <p
            className="
              mt-3
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            Security controls and authentication
            settings will appear here.
          </p>


        </div>


      </section>


    </main>
  );
}