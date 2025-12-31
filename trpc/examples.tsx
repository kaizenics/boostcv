/**
 * tRPC Usage Examples
 * 
 * This file demonstrates how to use tRPC in client and server components.
 * Import the appropriate utility based on your component type.
 */

// ============================================
// CLIENT COMPONENTS (use "use client" directive)
// ============================================

"use client";

import { trpc } from "@/trpc/client";
import { api as serverApi } from "@/trpc/server";

export function ClientComponentExample() {
  // Query examples
  const { data: user, isLoading } = trpc.user.me.useQuery();
  const { data: stats } = trpc.user.stats.useQuery();
  const { data: resumes } = trpc.resume.list.useQuery();
  
  // Get a single resume
  const { data: resume } = trpc.resume.getById.useQuery(
    { id: "resume-id" },
    { enabled: false } // Disable auto-fetch
  );

  // Mutation examples
  const utils = trpc.useUtils();
  
  const createResume = trpc.resume.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch resumes list
      utils.resume.list.invalidate();
    },
  });

  const updateResume = trpc.resume.update.useMutation({
    onSuccess: () => {
      utils.resume.list.invalidate();
    },
  });

  const deleteResume = trpc.resume.delete.useMutation({
    onSuccess: () => {
      utils.resume.list.invalidate();
    },
  });

  // Usage
  const handleCreateResume = async () => {
    await createResume.mutateAsync({
      title: "My Resume",
      templateId: "classic",
    });
  };

  const handleUpdateResume = async () => {
    await updateResume.mutateAsync({
      id: "resume-id",
      title: "Updated Title",
      data: {
        contact: {
          firstName: "John",
          lastName: "Doe",
          desiredJobTitle: "Software Engineer",
          phone: "+1234567890",
          email: "john@example.com",
        },
        experiences: [],
        educations: [],
        skills: [],
        summary: "",
        finalize: {
          languages: [],
          certifications: [],
          awards: [],
          websites: [],
          references: [],
          hobbies: [],
          customSections: [],
        },
      },
    });
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <p>Welcome, {user?.name}</p>}
      <button onClick={handleCreateResume}>Create Resume</button>
    </div>
  );
}

// ============================================
// SERVER COMPONENTS (async components)
// ============================================

/*
// Example of server component usage (in a separate file):

import { api } from "@/lib/trpc/server";

export default async function ServerComponentExample() {
  // Direct async calls in server components
  const user = await (await api()).user.me();
  const stats = await (await api()).user.stats();
  const resumes = await (await api()).resume.list();

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Total Resumes: {stats.totalResumes}</p>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.id}>{resume.title}</li>
        ))}
      </ul>
    </div>
  );
}
*/

// ============================================
// SERVER ACTIONS (in forms or event handlers)
// ============================================

/*
// Example of server action usage (in a separate file):

"use server";
import { api } from "@/lib/trpc/server";

export async function createResumeAction(formData: FormData) {
  const title = formData.get("title") as string;
  const templateId = formData.get("templateId") as string;

  const result = await (await api()).resume.create({
    title,
    templateId,
  });

  return result;
}

export async function updateResumeAction(resumeId: string, data: any) {
  await (await api()).resume.update({
    id: resumeId,
    data,
  });
}
*/
