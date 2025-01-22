
// src/pages/api/submit-form.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gecwxpoujptxdyfhtywa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlY3d4cG91anB0eGR5Zmh0eXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NzUxNTksImV4cCI6MjA1MzA1MTE1OX0.nqdfVa-LgVUQwHzsZM4DSrefVnqHw86LX_f0-6GIoxY';
const supabase = createClient(supabaseUrl, supabaseKey)

export async function post({ request }: { request: Request }) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const file = formData.get('file');

    // Upload file to Supabase Storage
    let fileUrl = null;
    if (file) {
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(`${Date.now()}-${(file as File).name}`, file as File);

        if (error) {
            console.error('Error uploading file:', error);
        } else {
            fileUrl = data.path;
        }
    }

    // Insert form data into Supabase table
    const { data, error } = await supabase
        .from('contact_messages')
        .insert([
            { name, email, message, file_url: fileUrl }
        ]);

    if (error) {
        console.error('Error inserting data:', error);
        return new Response(JSON.stringify({ error: 'Error submitting form' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
}
