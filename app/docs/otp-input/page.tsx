"use server"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"
import { DocsPage, PropsTable, type TocItem, type PropsTableRow } from "@/components/internal/docs"
import { getExampleCode } from "@/lib/serverUtils"

import { BasicExample } from "@/examples/docs/otp-input/basic-example"
import { PhoneVerificationExample } from "@/examples/docs/otp-input/phone-verification"
import { MaskedInputExample } from "@/examples/docs/otp-input/masked-input"
import { ErrorStateExample } from "@/examples/docs/otp-input/error-state"

const basicExampleCode = getExampleCode("docs/otp-input/basic-example.tsx")
const phoneVerificationCode = getExampleCode("docs/otp-input/phone-verification.tsx")
const maskedInputCode = getExampleCode("docs/otp-input/masked-input.tsx")
const errorStateCode = getExampleCode("docs/otp-input/error-state.tsx")

export default async function OtpInputDocs() {
  const toc: TocItem[] = [
    { id: "installation", title: "Installation" },
    { id: "examples", title: "Examples" },
    { id: "props", title: "Props" },
    { id: "accessibility", title: "Accessibility" },
  ]

  const propsRows: PropsTableRow[] = [
    {
      prop: "length",
      type: "number",
      defaultValue: "6",
      description: "Number of OTP cells rendered.",
    },
    {
      prop: "value",
      type: "string",
      description: "Controlled OTP string representing all cells.",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      description: "Called every time a character changes.",
      required: true,
    },
    {
      prop: "onComplete",
      type: "(value: string) => void",
      description: "Fires once the last cell receives input.",
    },
    {
      prop: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Adjusts cell dimensions for different contexts.",
    },
    {
      prop: "mask",
      type: "boolean",
      defaultValue: "false",
      description: "Masks each digit for added privacy.",
    },
    {
      prop: "error",
      type: "boolean",
      defaultValue: "false",
      description: "Applies error styling to all cells.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Prevents focusing and editing the OTP cells.",
    },
    {
      prop: "autoSubmit",
      type: "boolean",
      defaultValue: "false",
      description: "Invokes onComplete once all cells are filled.",
    },
  ]

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>OtpInput</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-5xl">
          <DocsPage
            toc={toc}
            header={{
              title: "OtpInput",
              description: "A multi-field OTP component with paste support, masking, and intelligent focus management.",
              category: "Form · Component",
              status: "Stable",
              actions: <CopyableCodeBadge text={config.getNamespacePath("otp-input")} />,
            }}
          >
            <section id="installation" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
                <p className="text-muted-foreground">
                  Scaffold the OTP input to include focus management utilities and styles.
                </p>
              </div>
              <InstallationTabs componentName="otp-input" />
            </section>

            <section id="examples" className="scroll-mt-24 space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
                <p className="text-muted-foreground">
                  Choose the variant that fits your verification flow.
                </p>
              </div>
              <PreviewTabs
                title="Email verification (6 digits)"
                preview={<BasicExample />}
                code={basicExampleCode}
              />
              <PreviewTabs
                title="Phone verification (4 digits)"
                preview={<PhoneVerificationExample />}
                code={phoneVerificationCode}
              />
              <PreviewTabs
                title="Masked input"
                preview={<MaskedInputExample />}
                code={maskedInputCode}
              />
              <PreviewTabs
                title="Error state"
                preview={<ErrorStateExample />}
                code={errorStateCode}
              />
            </section>

            <section id="props" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
                <p className="text-muted-foreground">
                  Configure the OTP behavior, then pass additional input props as needed.
                </p>
              </div>
              <PropsTable rows={propsRows} />
            </section>

            <section id="accessibility" className="scroll-mt-24 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">Accessibility</h2>
                <p className="text-muted-foreground">
                  OTP flows are time sensitive—provide clear guidance to every user.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Announce the expected OTP length in the label or helper text.</li>
                <li>Ensure paste support for users receiving codes via other devices.</li>
                <li>Keep error messaging concise and announce it with <code className="font-mono text-xs">role=&quot;alert&quot;</code>.</li>
              </ul>
            </section>
          </DocsPage>
        </div>
      </div>
    </div>
  )
}
