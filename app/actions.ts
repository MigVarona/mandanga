"use server";

import { STAY_OPTIONS } from "./components/stay-options";

export type SignupState = { status: "idle" | "ok" | "error"; message?: string };

const NOTION_VERSION = "2022-06-28";

/** Guarda un alta en la base de Notion. El token nunca sale del servidor. */
export async function signUp(_previous: SignupState, formData: FormData): Promise<SignupState> {
  // Trampa para bots: el campo va oculto, una persona nunca lo rellena.
  if (formData.get("website")) return { status: "ok" };

  const name = String(formData.get("name") ?? "").trim();
  const guests = Number(formData.get("guests") ?? 0);
  const note = String(formData.get("message") ?? "").trim();
  const option = STAY_OPTIONS.find((entry) => entry.value === formData.get("stay"));

  if (!name || !option || !Number.isInteger(guests) || guests < 1 || guests > 20) {
    return { status: "error", message: "Revisa el nombre, la opción y cuántos venís." };
  }

  const token = process.env.NOTION_TOKEN;
  const database = process.env.NOTION_DATABASE_ID;
  if (!token || !database) {
    console.error("Faltan NOTION_TOKEN o NOTION_DATABASE_ID");
    return { status: "error", message: "La lista no está conectada todavía. Avisa a los organizadores." };
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: database },
        properties: {
          Nombre: { title: [{ text: { content: name.slice(0, 200) } }] },
          "Opción": { select: { name: option.label } },
          Personas: { number: guests },
          Precio: { number: option.price },
          Mensaje: note ? { rich_text: [{ text: { content: note.slice(0, 1800) } }] } : { rich_text: [] },
        },
      }),
    });

    if (!response.ok) {
      console.error("Notion respondió", response.status, await response.text());
      return { status: "error", message: "No hemos podido guardarte. Prueba otra vez en un momento." };
    }
  } catch (error) {
    console.error("No se pudo llamar a Notion", error);
    return { status: "error", message: "No hemos podido guardarte. Prueba otra vez en un momento." };
  }

  return { status: "ok" };
}
