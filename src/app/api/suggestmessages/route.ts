import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text } = await generateText({
            model: openai('gpt-3.5-turbo'),
            prompt: "create a list of three open-ended and engaging questions formatted as a single string. each question should be separated by '||'. these questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. for example, your output should be structured like this: 'whats a hobby youve recently started?||if you could have dinner with any historical figure, who would it be? || whats a simple thing that makes you happy?'. ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment",
        });
    
        return NextResponse.json({ output: text });

    } catch (error) {
        console.error("Error in suggestmessages API:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}