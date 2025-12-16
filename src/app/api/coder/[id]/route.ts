
import CoderModel from "@/database/models/coder";
import { dbConnection } from "@/lib/dbConnection";

export async function GET(req, context) {
  const params = await context.params;   // ✔ obligatorio

  await dbConnection();

  const coder = await CoderModel.findById(params.id);

  if (!coder) {
    return Response.json({ error: "Coder no encontrado" }, { status: 404 });
  }

  return Response.json({
    photo: coder.photo,
  });
}
