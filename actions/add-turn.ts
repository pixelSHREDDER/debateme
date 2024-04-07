'use server'

// import { addTurnToDebate } from '@/data/debate'
import { z } from "zod";

const NewTurn = z.object({
  author: z.string(),
  body: z.string()
});

NewTurn.parse({ body: "Watson, come here." });

// extract the inferred type
type NewTurn = z.infer<typeof NewTurn>;
// { body: string }

export async function addTurn(prevState: any, formData: FormData) {
  const validatedFields = NewTurn.safeParse({
    body: formData.get('body'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'You got errors dude'
    }
  }

  try {
    /*const response = await addTurnToDebate(validatedFields, debateId);
    return response;*/
    return null;
  } catch (error) {
    return {
      errors: [ error ],
      message: 'You got errors dude'
    }
  }
}