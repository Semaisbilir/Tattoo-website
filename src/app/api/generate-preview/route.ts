// app/api/generate-preview/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { imageData, prompt } = await req.json();

  if (!imageData || !prompt) {
    return NextResponse.json(
      { error: 'Missing imageData or prompt in request body' },
      { status: 400 }
    );
  }

  try {
    const prediction = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "black-forest-labs/flux-kontext-pro", // update if needed
        input: {
          input_image: imageData,
          prompt,
          aspect_ratio: "match_input_image",
          output_format: "png",
          safety_tolerance: 2,
        },
      }),
    });

    const predictionData = await prediction.json();
    const predictionUrl = predictionData.urls.get;

    // Wait for the prediction to complete
    let result;
    while (true) {
      const pollRes = await fetch(predictionUrl, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      result = await pollRes.json();

      if (result.status === "succeeded") break;
      if (result.status === "failed") {
        return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));
    }

    return NextResponse.json({ output: result.output });
  } catch (err) {
    console.error("AI generation error:", err);
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 });
  }
}
