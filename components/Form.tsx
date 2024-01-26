'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { createComplete } from "@/app/action";
// import { act } from 'react-dom/test-utils'

const Form = () => {
  //todo: function to handle client side form action and submition
  async function clientAction(formData: FormData) {
    const prompt = formData.get("prompt");

    // if (!prompt) {
    //   //show toast notification
    //   toast.error("prompt is required");
    // }

    //todo: function to handle server side action(app=>action.tsx)
    // handling error from the server side instead.
    
    const {error} = await createComplete(prompt as string)
      if(error){
        toast.error(error)
      }
  }

  return (
    <section className="mx-auto max-w-lg">
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle>Next AI Blogger</CardTitle>
          <CardDescription>Generate a blog post about anything</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={clientAction} className="mt-3">
            <Input
              name="prompt"
              placeholder="What should I write about?"
              className="rounded-lg"
            />

            <Button
              size="sm"
              type="submit"
              className="mt-3 w-full rounded-lg "
            ></Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Form;
