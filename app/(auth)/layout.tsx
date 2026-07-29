import { Brain, Sparkles } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {
  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-background
        px-6
      "
    >

      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-br
          from-primary/10
          via-transparent
          to-transparent
        "
      />


      <div
        className="
          relative
          grid
          w-full
          max-w-5xl
          gap-12
          lg:grid-cols-2
          lg:items-center
        "
      >


        {/* Brand Section */}

        <div
          className="
            hidden
            space-y-6
            lg:block
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

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
              <Brain className="h-6 w-6" />
            </div>


            <span
              className="
                text-2xl
                font-bold
                tracking-tight
              "
            >
              VeriQ
            </span>

          </div>


          <div className="space-y-3">

            <h1
              className="
                text-5xl
                font-bold
                leading-tight
                tracking-tight
              "
            >
              Your knowledge,
              <br />
              powered by AI.
            </h1>


            <p
              className="
                max-w-md
                text-lg
                leading-8
                text-muted-foreground
              "
            >
              Upload your documents, build your
              personal knowledge base, and ask
              questions with AI-powered answers.
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-muted-foreground
            "
          >
            <Sparkles className="h-4 w-4 text-primary" />

            AI powered knowledge workspace

          </div>


        </div>



        {/* Form */}

        <div className="flex justify-center">
          {children}
        </div>


      </div>


    </div>
  );
}