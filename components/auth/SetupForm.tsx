"use client";

import { useActionState } from "react";

import { completeSetup, type SetupFormState } from "@/app/setup/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: SetupFormState = {};

export function SetupForm({
  defaults
}: {
  defaults: {
    firstName: string;
    lastName: string;
    companyName: string;
    title: string;
    businessDescription: string;
    naicsCodes: string;
    certifications: string;
    capabilities: string;
    stateFocus: string;
  };
}) {
  const [state, formAction, pending] = useActionState(completeSetup, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="first_name">
            First name
          </label>
          <Input id="first_name" name="first_name" defaultValue={defaults.firstName} disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="last_name">
            Last name
          </label>
          <Input id="last_name" name="last_name" defaultValue={defaults.lastName} disabled />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="company_name">
            Company name
          </label>
          <Input id="company_name" name="company_name" defaultValue={defaults.companyName} disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="title">
            Your title
          </label>
          <Input id="title" name="title" defaultValue={defaults.title} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="business_description">
          Business description
        </label>
        <textarea
          id="business_description"
          name="business_description"
          defaultValue={defaults.businessDescription}
          required
          className="min-h-[110px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          placeholder="Describe your firm, past performance, and the work you want mystateai to match."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="naics_codes">
          Primary NAICS codes
        </label>
        <Input
          id="naics_codes"
          name="naics_codes"
          defaultValue={defaults.naicsCodes}
          required
          placeholder="541512, 518210"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="capabilities">
          Core capabilities
        </label>
        <Input
          id="capabilities"
          name="capabilities"
          defaultValue={defaults.capabilities}
          required
          placeholder="Cloud migration, proposal management, cybersecurity"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="certifications">
            Certifications
          </label>
          <Input
            id="certifications"
            name="certifications"
            defaultValue={defaults.certifications}
            placeholder="8(a), WOSB, MBE"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="state_focus">
            Primary state focus
          </label>
          <Input id="state_focus" name="state_focus" defaultValue={defaults.stateFocus} required placeholder="Maryland" />
        </div>
      </div>

      {state.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Saving setup..." : "Finish setup"}
      </Button>
    </form>
  );
}
