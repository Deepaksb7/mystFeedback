import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from '@ai-sdk/rsc';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const stream = createStreamableValue('');

        (async () => {
            const { textStream } = streamText({
                model: openai('gpt-3.5-turbo'),
                prompt: "create a list of three open-ended and engaging questions formatted as a single string. each question should be separated by '||'. these questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that envourage friendly interaction. for example, your outpu should be structured like this: 'whats a hobby youve recently started?||if you could have dinner with any historical figure, who would it be? || whats a simple thing that makes you happy?'. ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcomimg conversational environment",
            });

            for await (const delta of textStream) {
                stream.update(delta);
            }
            stream.done();
        })();
    
        return NextResponse.json({ output: stream.value });

    } catch (error) {
    if (error instanceof OpenAI.APIError) {
        const { name, status, headers, message } = error
        return NextResponse.json({
            name, status, headers, message
        }, { status})
    } else {
        console.error("An unexpected error")
        throw error
    }
}
}