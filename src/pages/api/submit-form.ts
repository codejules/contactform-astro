import { createClient } from "@supabase/supabase-js";

export function handlerForm() {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Supabase credentials are missing");
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const form = document.querySelector<HTMLFormElement>("#contact-form");
    if (!form) {
        console.error("Form element not found");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formInputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");

        const submission: Record<string, string> = {};
        formInputs.forEach((element) => {
            const { value, name } = element;
            if (name && value.trim()) {
                submission[name] = value.trim();
            }
        });


        if (Object.keys(submission).length === 0) {
            alert("Please fill in the form before submitting.");
            return;
        }

        const { error } = await supabase.from("entries").insert([submission]);

        if (error) {
            console.error("Error inserting data:", error.message);
            alert("There was an error. Please try again later.");
        } else {
            alert("Thanks for contacting us!");
            form.reset();
        }
    });
}

document.addEventListener("astro:page-load", () => {
    handlerForm();
});
