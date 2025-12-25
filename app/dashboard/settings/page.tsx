
"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [monochrome, setMonochrome] = useState(true);
  const [saving, setSaving] = useState(false);

  const onSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    // TODO: wire to backend
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    alert("Settings saved (mock)");
  };

  const onReset = () => {
    setName("");
    setEmail("");
    setReceiveEmails(true);
    setMonochrome(true);
  };

  const onDelete = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // TODO: call delete endpoint
      alert("Account deleted (mock)");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile, preferences, and account settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main form */}
        <form onSubmit={onSave} className="lg:col-span-2 space-y-6 rounded-xl border border-border bg-card p-6">
          <section className="space-y-3">
            <h2 className="text-lg font-medium text-foreground">Profile</h2>
            <p className="text-sm text-muted-foreground">Basic information shown on your account.</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-foreground">Preferences</h2>
            <p className="text-sm text-muted-foreground">Customize your experience.</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Checkbox checked={monochrome} onCheckedChange={(v) => setMonochrome(Boolean(v))} />
                <div>
                  <p className="text-sm font-medium text-foreground">Monochrome theme</p>
                  <p className="text-xs text-muted-foreground">Use black & white theme across the app.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox checked={receiveEmails} onCheckedChange={(v) => setReceiveEmails(Boolean(v))} />
                <div>
                  <p className="text-sm font-medium text-foreground">Email notifications</p>
                  <p className="text-xs text-muted-foreground">Receive product updates and tips via email.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onReset} type="button">Reset</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          </div>
        </form>

        {/* Sidebar actions */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-medium text-foreground">Account</h3>
            <p className="mt-2 text-sm text-muted-foreground">Email: <span className="text-foreground">{email || "you@example.com"}</span></p>

            <div className="mt-4 flex flex-col gap-2">
              <Link href="/dashboard/profile" className="text-sm text-foreground hover:underline">Edit profile</Link>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/change-password">Change password</Link>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
                <Link href="/logout">Sign out</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-medium text-foreground">Danger zone</h3>
            <p className="mt-2 text-sm text-muted-foreground">Permanently delete your account and all its data.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:bg-muted/10" onClick={onDelete}>Delete account</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-medium text-foreground">Help & Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">Visit our docs or contact support for help.</p>
            <div className="mt-3">
              <Link href="/help" className="text-sm text-foreground hover:underline">View docs</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}