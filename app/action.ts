"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export async function createComplete(prompt: string) {
  if (!prompt) {
    return { error: "Prompt is required!." };
  }

  //TODO: generate a blog post using openai

  const messages: any = [
    {
      role: "user",
      content: `Write a blog post around 200 words about the following topic: "${prompt}" in markdown format.`,
    },
  ];

  // passing in the apikey from const openai
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages, //pass in the messages here
  });

  const content = completion?.choices?.[0]?.message?.content;
  if (!content) {
    return { error: "Unable to generate the blog content." };
  }

  //TODO: generate an image using openai
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Generate an image for a blog post about "${prompt}"`,
    n: 1,
    size: "1792x1024",
    response_format: "b64_json", //image id used instead of img url
  });

  const imageName = `blog-${Date.now()}`;
  const imageData = image?.data?.[0]?.b64_json as string;
  if (!imageData) {
    return { error: "Unable to generate the blog image." };
  }


  
  //TODO: upload  save  the image to supabase storage (bucket)
  const { data, error } = await supabase.storage
    .from("blogs")
    .upload(imageName, decode(imageData), {
      contentType: "image/png",
    });
  if (error) {
    return { error: "Unable to upload the blog image to Storage." };
  }

  //TODO: create a new blog post in supabase
}
